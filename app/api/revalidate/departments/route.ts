// app/api/revalidate/departments/route.ts
import { revalidateTag } from 'next/cache'

export async function POST() {
    revalidateTag('departments')
    revalidateTag('map-data')
    return Response.json({ revalidated: true })
}