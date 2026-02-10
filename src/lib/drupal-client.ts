/**
 * Drupal JSON:API Client
 * 
 * Client for fetching cached content from Drupal Headless CMS:
 * - Courses (synced from BASZ PIM)
 * - Schedules (synced from BASZ Planning)
 * - Blog posts, Events, Trainers
 * - Landing pages, FAQs
 * 
 * @see pixel-perfect-replica/docs/WEBSITE_ARCHITECTURE.md for full API spec
 */

export interface DrupalClientConfig {
  baseUrl: string;
  brandId: string;
  /** Optional API key for authenticated requests */
  apiKey?: string;
  /** Cache TTL in seconds (default: 300) */
  cacheTtl?: number;
}

// ============================================================================
// JSON:API Types
// ============================================================================

export interface JsonApiDocument<T> {
  data: T;
  included?: JsonApiResource[];
  links?: JsonApiLinks;
  meta?: JsonApiMeta;
}

export interface JsonApiCollection<T> {
  data: T[];
  included?: JsonApiResource[];
  links?: JsonApiLinks;
  meta?: JsonApiMeta;
}

export interface JsonApiResource {
  type: string;
  id: string;
  attributes: Record<string, unknown>;
  relationships?: Record<string, JsonApiRelationship>;
  links?: JsonApiLinks;
}

export interface JsonApiRelationship {
  data: { type: string; id: string } | { type: string; id: string }[] | null;
  links?: JsonApiLinks;
}

export interface JsonApiLinks {
  self?: string;
  next?: string;
  prev?: string;
  first?: string;
  last?: string;
}

export interface JsonApiMeta {
  count?: number;
  [key: string]: unknown;
}

// ============================================================================
// Content Types
// ============================================================================

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  duration: number;
  durationUnit: 'days' | 'hours';
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  priceDisplay: string;
  imageUrl?: string;
  categories: Category[];
  trainers: Trainer[];
  seo: {
    title: string;
    description: string;
  };
  baszId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CourseSchedule {
  id: string;
  courseId: string;
  startDate: string;
  endDate: string;
  location: Location;
  instructor?: Trainer;
  seatsDisplay: string;
  status: 'scheduled' | 'confirmed' | 'cancelled';
  baszId: string;
}

export interface Trainer {
  id: string;
  name: string;
  slug: string;
  bio: string;
  photoUrl?: string;
  specializations: string[];
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
}

export interface Location {
  id: string;
  name: string;
  city: string;
  address?: string;
  type: 'classroom' | 'online' | 'hybrid';
}

export interface LearningPath {
  id: string;
  title: string;
  slug: string;
  description: string;
  courses: Course[];
  totalDuration: number;
  certification?: string;
  level: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  author: string;
  imageUrl?: string;
  categories: string[];
  tags: string[];
  publishedAt: string;
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  eventDate: string;
  eventEndDate?: string;
  location: string;
  type: 'webinar' | 'workshop' | 'conference' | 'meetup';
  registrationUrl?: string;
  imageUrl?: string;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
}

export interface Testimonial {
  id: string;
  quote: string;
  authorName: string;
  authorCompany?: string;
  authorRole?: string;
  courseId?: string;
  rating?: number;
}

// ============================================================================
// Query Parameters
// ============================================================================

export interface QueryParams {
  /** Filter by field values */
  filter?: Record<string, string | string[] | FilterCondition>;
  /** Include related entities */
  include?: string[];
  /** Sort by fields (prefix with - for descending) */
  sort?: string[];
  /** Pagination */
  page?: {
    limit?: number;
    offset?: number;
  };
  /** Sparse fieldsets */
  fields?: Record<string, string[]>;
}

export interface FilterCondition {
  operator: '=' | '!=' | '>' | '<' | '>=' | '<=' | 'IN' | 'NOT IN' | 'CONTAINS' | 'STARTS_WITH';
  value: string | string[];
}

// ============================================================================
// Drupal JSON:API Client Class
// ============================================================================

export class DrupalClient {
  private baseUrl: string;
  private brandId: string;
  private apiKey?: string;
  private cacheTtl: number;
  
  constructor(config: DrupalClientConfig) {
    this.baseUrl = config.baseUrl.replace(/\/$/, '');
    this.brandId = config.brandId;
    this.apiKey = config.apiKey;
    this.cacheTtl = config.cacheTtl ?? 300;
  }
  
  // ==========================================================================
  // HTTP Methods
  // ==========================================================================
  
  private buildUrl(path: string, params?: QueryParams): string {
    const url = new URL(`${this.baseUrl}/jsonapi${path}`);
    
    if (params?.filter) {
      Object.entries(params.filter).forEach(([key, value]) => {
        if (typeof value === 'string') {
          url.searchParams.set(`filter[${key}]`, value);
        } else if (Array.isArray(value)) {
          url.searchParams.set(`filter[${key}][operator]`, 'IN');
          value.forEach((v, i) => {
            url.searchParams.set(`filter[${key}][value][${i}]`, v);
          });
        } else {
          url.searchParams.set(`filter[${key}][operator]`, value.operator);
          if (Array.isArray(value.value)) {
            value.value.forEach((v, i) => {
              url.searchParams.set(`filter[${key}][value][${i}]`, v);
            });
          } else {
            url.searchParams.set(`filter[${key}][value]`, value.value);
          }
        }
      });
    }
    
    if (params?.include?.length) {
      url.searchParams.set('include', params.include.join(','));
    }
    
    if (params?.sort?.length) {
      url.searchParams.set('sort', params.sort.join(','));
    }
    
    if (params?.page) {
      if (params.page.limit) {
        url.searchParams.set('page[limit]', String(params.page.limit));
      }
      if (params.page.offset) {
        url.searchParams.set('page[offset]', String(params.page.offset));
      }
    }
    
    if (params?.fields) {
      Object.entries(params.fields).forEach(([type, fields]) => {
        url.searchParams.set(`fields[${type}]`, fields.join(','));
      });
    }
    
    return url.toString();
  }
  
  private async fetch<T>(path: string, params?: QueryParams): Promise<T> {
    const url = this.buildUrl(path, params);
    
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.api+json',
    };
    
    if (this.apiKey) {
      headers['X-Api-Key'] = this.apiKey;
    }
    
    const response = await fetch(url, {
      headers,
      next: { revalidate: this.cacheTtl },
    });
    
    if (!response.ok) {
      throw new DrupalApiError(response.status, await response.text());
    }
    
    return response.json();
  }
  
  // ==========================================================================
  // Course Methods
  // ==========================================================================
  
  async getCourses(params?: QueryParams): Promise<Course[]> {
    const response = await this.fetch<JsonApiCollection<JsonApiResource>>('/node/course', {
      ...params,
      filter: {
        ...params?.filter,
        'field_brand.id': this.brandId,
      },
      include: ['field_category', 'field_trainer', 'field_image'],
      sort: params?.sort ?? ['-created'],
    });
    
    return response.data.map((resource) => this.mapCourse(resource, response.included));
  }
  
  async getCourse(slug: string): Promise<Course | null> {
    const response = await this.fetch<JsonApiCollection<JsonApiResource>>('/node/course', {
      filter: {
        'field_brand.id': this.brandId,
        'field_slug': slug,
      },
      include: ['field_category', 'field_trainer', 'field_image', 'field_related_courses'],
    });
    
    if (!response.data.length) return null;
    return this.mapCourse(response.data[0], response.included);
  }
  
  async getCourseById(id: string): Promise<Course | null> {
    try {
      const response = await this.fetch<JsonApiDocument<JsonApiResource>>(`/node/course/${id}`, {
        include: ['field_category', 'field_trainer', 'field_image'],
      });
      return this.mapCourse(response.data, response.included);
    } catch (error) {
      if (error instanceof DrupalApiError && error.status === 404) {
        return null;
      }
      throw error;
    }
  }
  
  async getCoursesByCategory(categorySlug: string): Promise<Course[]> {
    return this.getCourses({
      filter: {
        'field_category.field_slug': categorySlug,
      },
    });
  }
  
  async searchCourses(query: string, limit = 10): Promise<Course[]> {
    return this.getCourses({
      filter: {
        title: { operator: 'CONTAINS', value: query },
      },
      page: { limit },
    });
  }
  
  // ==========================================================================
  // Schedule Methods
  // ==========================================================================
  
  async getSchedules(courseId: string): Promise<CourseSchedule[]> {
    const today = new Date().toISOString().split('T')[0];
    
    const response = await this.fetch<JsonApiCollection<JsonApiResource>>('/node/course_schedule', {
      filter: {
        'field_course.id': courseId,
        'field_start_date': { operator: '>=', value: today },
      },
      include: ['field_location', 'field_instructor'],
      sort: ['field_start_date'],
    });
    
    return response.data.map((resource) => this.mapSchedule(resource, response.included));
  }
  
  async getUpcomingSchedules(limit = 10): Promise<CourseSchedule[]> {
    const today = new Date().toISOString().split('T')[0];
    
    const response = await this.fetch<JsonApiCollection<JsonApiResource>>('/node/course_schedule', {
      filter: {
        'field_course.field_brand.id': this.brandId,
        'field_start_date': { operator: '>=', value: today },
      },
      include: ['field_course', 'field_location', 'field_instructor'],
      sort: ['field_start_date'],
      page: { limit },
    });
    
    return response.data.map((resource) => this.mapSchedule(resource, response.included));
  }
  
  // ==========================================================================
  // Trainer Methods
  // ==========================================================================
  
  async getTrainers(): Promise<Trainer[]> {
    const response = await this.fetch<JsonApiCollection<JsonApiResource>>('/node/trainer', {
      sort: ['title'],
    });
    
    return response.data.map((resource) => this.mapTrainer(resource));
  }
  
  async getTrainer(slug: string): Promise<Trainer | null> {
    const response = await this.fetch<JsonApiCollection<JsonApiResource>>('/node/trainer', {
      filter: { 'field_slug': slug },
    });
    
    if (!response.data.length) return null;
    return this.mapTrainer(response.data[0]);
  }
  
  // ==========================================================================
  // Blog Methods
  // ==========================================================================
  
  async getBlogPosts(params?: QueryParams): Promise<BlogPost[]> {
    const response = await this.fetch<JsonApiCollection<JsonApiResource>>('/node/blog', {
      ...params,
      filter: {
        ...params?.filter,
        'field_brand.id': this.brandId,
      },
      sort: params?.sort ?? ['-created'],
    });
    
    return response.data.map((resource) => this.mapBlogPost(resource));
  }
  
  async getBlogPost(slug: string): Promise<BlogPost | null> {
    const response = await this.fetch<JsonApiCollection<JsonApiResource>>('/node/blog', {
      filter: {
        'field_brand.id': this.brandId,
        'field_slug': slug,
      },
    });
    
    if (!response.data.length) return null;
    return this.mapBlogPost(response.data[0]);
  }
  
  // ==========================================================================
  // Event Methods
  // ==========================================================================
  
  async getEvents(params?: QueryParams): Promise<Event[]> {
    const today = new Date().toISOString().split('T')[0];
    
    const response = await this.fetch<JsonApiCollection<JsonApiResource>>('/node/event', {
      ...params,
      filter: {
        ...params?.filter,
        'field_brand.id': this.brandId,
        'field_event_date': { operator: '>=', value: today },
      },
      sort: ['field_event_date'],
    });
    
    return response.data.map((resource) => this.mapEvent(resource));
  }
  
  async getEvent(slug: string): Promise<Event | null> {
    const response = await this.fetch<JsonApiCollection<JsonApiResource>>('/node/event', {
      filter: {
        'field_brand.id': this.brandId,
        'field_slug': slug,
      },
    });
    
    if (!response.data.length) return null;
    return this.mapEvent(response.data[0]);
  }
  
  // ==========================================================================
  // Learning Path Methods
  // ==========================================================================
  
  async getLearningPaths(): Promise<LearningPath[]> {
    const response = await this.fetch<JsonApiCollection<JsonApiResource>>('/node/learning_path', {
      filter: { 'field_brand.id': this.brandId },
      include: ['field_courses'],
      sort: ['title'],
    });
    
    return response.data.map((resource) => this.mapLearningPath(resource, response.included));
  }
  
  async getLearningPath(slug: string): Promise<LearningPath | null> {
    const response = await this.fetch<JsonApiCollection<JsonApiResource>>('/node/learning_path', {
      filter: {
        'field_brand.id': this.brandId,
        'field_slug': slug,
      },
      include: ['field_courses'],
    });
    
    if (!response.data.length) return null;
    return this.mapLearningPath(response.data[0], response.included);
  }
  
  // ==========================================================================
  // Other Content Methods
  // ==========================================================================
  
  async getFaqs(category?: string): Promise<Faq[]> {
    const response = await this.fetch<JsonApiCollection<JsonApiResource>>('/node/faq', {
      filter: category ? { 'field_category': category } : undefined,
      sort: ['field_order'],
    });
    
    return response.data.map((resource) => this.mapFaq(resource));
  }
  
  async getTestimonials(courseId?: string): Promise<Testimonial[]> {
    const response = await this.fetch<JsonApiCollection<JsonApiResource>>('/node/testimonial', {
      filter: courseId ? { 'field_course.id': courseId } : undefined,
      page: { limit: 10 },
    });
    
    return response.data.map((resource) => this.mapTestimonial(resource));
  }
  
  async getCategories(): Promise<Category[]> {
    const response = await this.fetch<JsonApiCollection<JsonApiResource>>('/taxonomy_term/course_category', {
      sort: ['name'],
    });
    
    return response.data.map((resource) => this.mapCategory(resource));
  }
  
  // ==========================================================================
  // Mapping Functions
  // ==========================================================================
  
  private mapCourse(resource: JsonApiResource, included?: JsonApiResource[]): Course {
    const attrs = resource.attributes;
    
    return {
      id: resource.id,
      title: String(attrs.title ?? ''),
      slug: String(attrs.field_slug ?? ''),
      description: String((attrs.field_description as { value?: string })?.value ?? ''),
      shortDescription: String(attrs.field_short_description ?? ''),
      duration: Number(attrs.field_duration ?? 0),
      durationUnit: String(attrs.field_duration_unit ?? 'days') as 'days' | 'hours',
      level: String(attrs.field_level ?? 'intermediate') as Course['level'],
      priceDisplay: String(attrs.field_price_display ?? ''),
      imageUrl: this.getIncludedImageUrl(resource.relationships?.field_image, included),
      categories: this.getIncludedResources<Category>(
        resource.relationships?.field_category,
        included,
        this.mapCategory.bind(this)
      ),
      trainers: this.getIncludedResources<Trainer>(
        resource.relationships?.field_trainer,
        included,
        this.mapTrainer.bind(this)
      ),
      seo: {
        title: String(attrs.field_seo_title ?? attrs.title ?? ''),
        description: String(attrs.field_seo_description ?? ''),
      },
      baszId: String(attrs.field_basz_id ?? ''),
      createdAt: String(attrs.created ?? ''),
      updatedAt: String(attrs.changed ?? ''),
    };
  }
  
  private mapSchedule(resource: JsonApiResource, included?: JsonApiResource[]): CourseSchedule {
    const attrs = resource.attributes;
    
    return {
      id: resource.id,
      courseId: (resource.relationships?.field_course?.data as { id: string })?.id ?? '',
      startDate: String(attrs.field_start_date ?? ''),
      endDate: String(attrs.field_end_date ?? ''),
      location: this.getIncludedResource<Location>(
        resource.relationships?.field_location,
        included,
        this.mapLocation.bind(this)
      ) ?? { id: '', name: 'Online', city: '', type: 'online' },
      instructor: this.getIncludedResource<Trainer>(
        resource.relationships?.field_instructor,
        included,
        this.mapTrainer.bind(this)
      ),
      seatsDisplay: String(attrs.field_seats_display ?? ''),
      status: String(attrs.field_status ?? 'scheduled') as CourseSchedule['status'],
      baszId: String(attrs.field_basz_id ?? ''),
    };
  }
  
  private mapTrainer(resource: JsonApiResource): Trainer {
    const attrs = resource.attributes;
    
    return {
      id: resource.id,
      name: String(attrs.title ?? ''),
      slug: String(attrs.field_slug ?? ''),
      bio: String((attrs.field_bio as { value?: string })?.value ?? ''),
      photoUrl: String(attrs.field_photo_url ?? ''),
      specializations: (attrs.field_specializations as string[]) ?? [],
      socialLinks: {
        linkedin: attrs.field_linkedin ? String(attrs.field_linkedin) : undefined,
        twitter: attrs.field_twitter ? String(attrs.field_twitter) : undefined,
      },
    };
  }
  
  private mapCategory(resource: JsonApiResource): Category {
    const attrs = resource.attributes;
    
    return {
      id: resource.id,
      name: String(attrs.name ?? ''),
      slug: String(attrs.field_slug ?? ''),
      description: attrs.description ? String((attrs.description as { value?: string }).value ?? '') : undefined,
      parentId: (resource.relationships?.parent?.data as { id: string })?.id,
    };
  }
  
  private mapLocation(resource: JsonApiResource): Location {
    const attrs = resource.attributes;
    
    return {
      id: resource.id,
      name: String(attrs.title ?? ''),
      city: String(attrs.field_city ?? ''),
      address: attrs.field_address ? String(attrs.field_address) : undefined,
      type: String(attrs.field_type ?? 'classroom') as Location['type'],
    };
  }
  
  private mapBlogPost(resource: JsonApiResource): BlogPost {
    const attrs = resource.attributes;
    
    return {
      id: resource.id,
      title: String(attrs.title ?? ''),
      slug: String(attrs.field_slug ?? ''),
      excerpt: String(attrs.field_excerpt ?? ''),
      body: String((attrs.body as { value?: string })?.value ?? ''),
      author: String(attrs.field_author ?? ''),
      imageUrl: attrs.field_image_url ? String(attrs.field_image_url) : undefined,
      categories: (attrs.field_categories as string[]) ?? [],
      tags: (attrs.field_tags as string[]) ?? [],
      publishedAt: String(attrs.created ?? ''),
    };
  }
  
  private mapEvent(resource: JsonApiResource): Event {
    const attrs = resource.attributes;
    
    return {
      id: resource.id,
      title: String(attrs.title ?? ''),
      slug: String(attrs.field_slug ?? ''),
      description: String((attrs.body as { value?: string })?.value ?? ''),
      eventDate: String(attrs.field_event_date ?? ''),
      eventEndDate: attrs.field_event_end_date ? String(attrs.field_event_end_date) : undefined,
      location: String(attrs.field_location ?? ''),
      type: String(attrs.field_event_type ?? 'webinar') as Event['type'],
      registrationUrl: attrs.field_registration_url ? String(attrs.field_registration_url) : undefined,
      imageUrl: attrs.field_image_url ? String(attrs.field_image_url) : undefined,
    };
  }
  
  private mapLearningPath(resource: JsonApiResource, included?: JsonApiResource[]): LearningPath {
    const attrs = resource.attributes;
    
    return {
      id: resource.id,
      title: String(attrs.title ?? ''),
      slug: String(attrs.field_slug ?? ''),
      description: String((attrs.body as { value?: string })?.value ?? ''),
      courses: this.getIncludedResources<Course>(
        resource.relationships?.field_courses,
        included,
        (r) => this.mapCourse(r, included)
      ),
      totalDuration: Number(attrs.field_total_duration ?? 0),
      certification: attrs.field_certification ? String(attrs.field_certification) : undefined,
      level: String(attrs.field_level ?? 'intermediate'),
    };
  }
  
  private mapFaq(resource: JsonApiResource): Faq {
    const attrs = resource.attributes;
    
    return {
      id: resource.id,
      question: String(attrs.title ?? ''),
      answer: String((attrs.body as { value?: string })?.value ?? ''),
      category: String(attrs.field_category ?? ''),
      order: Number(attrs.field_order ?? 0),
    };
  }
  
  private mapTestimonial(resource: JsonApiResource): Testimonial {
    const attrs = resource.attributes;
    
    return {
      id: resource.id,
      quote: String(attrs.field_quote ?? ''),
      authorName: String(attrs.field_author_name ?? ''),
      authorCompany: attrs.field_author_company ? String(attrs.field_author_company) : undefined,
      authorRole: attrs.field_author_role ? String(attrs.field_author_role) : undefined,
      courseId: (resource.relationships?.field_course?.data as { id: string })?.id,
      rating: attrs.field_rating ? Number(attrs.field_rating) : undefined,
    };
  }
  
  private getIncludedResource<T>(
    relationship: JsonApiRelationship | undefined,
    included: JsonApiResource[] | undefined,
    mapper: (resource: JsonApiResource) => T
  ): T | undefined {
    if (!relationship?.data || Array.isArray(relationship.data)) return undefined;
    
    const ref = relationship.data;
    const resource = included?.find((r) => r.type === ref.type && r.id === ref.id);
    
    return resource ? mapper(resource) : undefined;
  }
  
  private getIncludedResources<T>(
    relationship: JsonApiRelationship | undefined,
    included: JsonApiResource[] | undefined,
    mapper: (resource: JsonApiResource) => T
  ): T[] {
    if (!relationship?.data || !Array.isArray(relationship.data)) return [];
    
    return relationship.data
      .map((ref) => included?.find((r) => r.type === ref.type && r.id === ref.id))
      .filter((r): r is JsonApiResource => !!r)
      .map(mapper);
  }
  
  private getIncludedImageUrl(
    relationship: JsonApiRelationship | undefined,
    included: JsonApiResource[] | undefined
  ): string | undefined {
    if (!relationship?.data || Array.isArray(relationship.data)) return undefined;
    
    const ref = relationship.data;
    const media = included?.find((r) => r.type === ref.type && r.id === ref.id);
    
    if (!media) return undefined;
    
    // Navigate to file entity if present
    const fileRel = media.relationships?.field_media_image?.data as { type: string; id: string } | undefined;
    if (fileRel) {
      const file = included?.find((r) => r.type === fileRel.type && r.id === fileRel.id);
      const uri = file?.attributes?.uri as { url?: string } | undefined;
      return uri?.url;
    }
    
    const mediaImage = media.attributes?.field_media_image as { url?: string } | undefined;
    return mediaImage?.url;
  }
}

// ============================================================================
// Error Class
// ============================================================================

export class DrupalApiError extends Error {
  constructor(
    public status: number,
    public body: string
  ) {
    super(`Drupal API Error (${status}): ${body}`);
    this.name = 'DrupalApiError';
  }
}

// ============================================================================
// Factory Function
// ============================================================================

let clientInstance: DrupalClient | null = null;

export function createDrupalClient(config: DrupalClientConfig): DrupalClient {
  clientInstance = new DrupalClient(config);
  return clientInstance;
}

export function getDrupalClient(): DrupalClient {
  if (!clientInstance) {
    throw new Error('Drupal client not initialized. Call createDrupalClient first.');
  }
  return clientInstance;
}
