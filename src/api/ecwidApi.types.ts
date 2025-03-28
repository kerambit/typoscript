export type BaseSearchResponse = {
  total: number
  count: number
  offset: number
  limit: number
  items: unknown[]
}

export type SearchCategoriesResponse = BaseSearchResponse & {
  items: CategoryData[]
}

export type CategoryData = {
  id: number
  orderBy: number
  name: string
  nameTranslated: Translated
  url: string
  autogeneratedSlug: string
  customSlug: string
  productCount: number
  description: string
  descriptionTranslated: Translated
  enabled: boolean
  isSampleCategory: boolean
  seoTitle: string
  seoDescription: string
  alt: Alt
  imageUrl?: string
}

export type Alt = {
  main: string
}

export type Translated = {
  nl: string
}

export type SearchProductsResponse = BaseSearchResponse & {
  items: ProductData[]
}

export type ProductData = {
  id: number
  sku: string
  thumbnailUrl: string
  unlimited: boolean
  inStock: boolean
  name: string
  price: number
  priceInProductList: number
  defaultDisplayedPrice: number
  defaultDisplayedPriceFormatted: string
  tax: Tax
  lowestPrice: number
  defaultDisplayedLowestPrice: number
  defaultDisplayedLowestPriceFormatted: string
  lowestPriceSettings: LowestPriceSettings
  isShippingRequired: boolean
  hasFreeShipping: boolean
  weight: number
  url: string
  autogeneratedSlug: string
  customSlug: string
  created: string
  updated: string
  createTimestamp: number
  updateTimestamp: number
  productClassId: number
  enabled: boolean
  options: Option[]
  fixedShippingRateOnly: boolean
  fixedShippingRate: number
  shipping: Shipping
  defaultCombinationId: number
  imageUrl: string
  smallThumbnailUrl: string
  hdThumbnailUrl: string
  originalImageUrl: string
  originalImage: OriginalImage
  borderInfo: BorderInfo
  description: string
  galleryImages: GalleryImage[]
  media: Media
  categoryIds: number[]
  categories: Category[]
  defaultCategoryId: number
  seoTitle: string
  seoDescription: string
  attributes: unknown[]
  relatedProducts: RelatedProducts
  combinations: unknown[]
  volume: number
  showOnFrontpage: number
  isSampleProduct: boolean
  googleItemCondition: string
  isGiftCard: boolean
  discountsAllowed: boolean
  nameYourPriceEnabled: boolean
}

export type BorderInfo = {
  dominatingColor: DominatingColor
  homogeneity: boolean
}

export type DominatingColor = {
  red: number
  green: number
  blue: number
  alpha: number
}

export type Category = {
  id: number
  enabled: boolean
}

export type GalleryImage = {
  id: number
  url: string
  thumbnail: string
  originalImageUrl: string
  imageUrl: string
  hdThumbnailUrl: string
  thumbnailUrl: string
  smallThumbnailUrl: string
  width: number
  height: number
  orderBy: number
  borderInfo: BorderInfo
}

export type LowestPriceSettings = {
  lowestPriceEnabled: boolean
}

export type Media = {
  images: Image[]
  videos: unknown[]
}

export type Image = {
  id: string
  isMain: boolean
  orderBy: number
  image160pxUrl: string
  image400pxUrl: string
  image800pxUrl: string
  image1500pxUrl: string
  imageOriginalUrl: string
}

export type Option = {
  type: string
  name: Name
  nameTranslated: Translated
  choices: Choice[]
  defaultChoice: number
  required: boolean
}

export type Choice = {
  text: Name
  textTranslated: Translated
  priceModifier: number
  priceModifierType: PriceModifierType
}

export enum PriceModifierType {
  Absolute = 'ABSOLUTE',
}

export enum Name {
  L = 'L',
  M = 'M',
  S = 'S',
  Size = 'Size',
}

export type OriginalImage = {
  url: string
  width: number
  height: number
}

export type RelatedProducts = {
  productIds: number[]
  relatedCategory: RelatedCategory
}

export type RelatedCategory = {
  enabled: boolean
  categoryId: number
  productCount: number
}

export type Shipping = {
  type: string
  methodMarkup: number
  flatRate: number
  disabledMethods: any[]
  enabledMethods: any[]
}

export type Tax = {
  taxable: boolean
  defaultLocationIncludedTaxRate: number
  enabledManualTaxes: any[]
  taxClassCode: string
}
