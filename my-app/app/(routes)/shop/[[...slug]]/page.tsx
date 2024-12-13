type Params = {
  params: {
    slug: string[];
  };
};

export default function ShopSlug({ params: { slug } }: Params) {
  return <>Slug : {JSON.stringify(slug)}</>;
}
