import type { SearchCategoriesResponse, SearchProductsResponse } from '@/api/ecwidApi.types.ts'

async function fetchWithHandlingError<T>(fetchFn: Promise<Response>, defaultValue: T): Promise<T> {
  try {
    const response = await fetchFn

    if (!response.ok) {
      throw new Error(`Failed to fetch data for ${response.url}. Status: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error(error)
    return defaultValue
  }
}

export async function getCategories(
  storeId: number,
  token: string,
  searchParams: Record<string, string>,
): Promise<SearchCategoriesResponse> {
  let url = `https://app.ecwid.com/api/v3/${storeId}/categories`

  if (searchParams !== undefined && Object.keys(searchParams).length > 0) {
    url += '?' + new URLSearchParams(searchParams).toString()
  }

  return await fetchWithHandlingError<SearchCategoriesResponse>(
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }),
    { count: 0, limit: 0, offset: 0, total: 0, items: [] },
  )
}

export async function searchProducts(
  storeId: number,
  token: string,
  categoryId: number,
): Promise<SearchProductsResponse> {
  const url = `https://app.ecwid.com/api/v3/${storeId}/products?category=${categoryId}&enabled=true`

  return await fetchWithHandlingError<SearchProductsResponse>(
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }),
    { count: 0, limit: 0, offset: 0, total: 0, items: [] },
  )
}
