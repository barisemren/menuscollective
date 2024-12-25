import AuthWrapper from "@/wrappers/auth-wrapper";

export default async function RestaurantDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  return (
    <AuthWrapper>
      <div>My Post: {slug}</div>
    </AuthWrapper>
  );
}
