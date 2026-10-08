import { Star } from "lucide-react";
export const toNumber = (v: any) => Number(String(v ?? "").replace(/[^0-9.]/g, "")) || 0;

export const getPricing = (item: any) => {
  const salePrice = toNumber(item.price);
  const originalPrice = toNumber(item.originalPrice);
  const hasDiscount = originalPrice > salePrice && salePrice > 0;
  const discountPercent = hasDiscount
    ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
    : 0;
  return { salePrice, originalPrice, hasDiscount, discountPercent };
};

export const DiscountBadge = ({ item }: { item: any }) => {
  const { hasDiscount, discountPercent } = getPricing(item);
  if (!hasDiscount) return null;
  return (
    <span className="absolute top-3 left-3 bg-rose-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow">
      {discountPercent}% OFF
    </span>
  );
};

export const RatingRow = ({ item }: { item: any }) => {
  const rating = Number(item.rating) || 0;
  const reviewCount = Number(item.reviewCount) || 0;
  if (rating <= 0) return null;
  return (
    <div className="flex items-center space-x-1.5">
      <span className="inline-flex items-center space-x-1 bg-emerald-600 text-white text-[11px] font-bold px-1.5 py-0.5 rounded">
        <span>{rating.toFixed(1)}</span>
        <Star size={10} className="fill-white" />
      </span>
      {reviewCount > 0 && (
        <span className="text-[11px] text-neutral-500">
          ({reviewCount.toLocaleString("en-IN")} reviews)
        </span>
      )}
    </div>
  );
};

export const PriceBlock = ({ item }: { item: any }) => {
  const { salePrice, originalPrice, hasDiscount } = getPricing(item);
  // No discount: show the price exactly as before
  if (!hasDiscount) {
    return <span className="text-neutral-900 font-bold text-sm">₹{item.price}</span>;
  }
  return (
    <div className="flex flex-col leading-tight">
      <div className="flex items-baseline space-x-1.5">
        <span className="text-neutral-900 font-bold text-sm">₹{salePrice.toLocaleString("en-IN")}</span>
        <span className="text-neutral-400 text-xs line-through">₹{originalPrice.toLocaleString("en-IN")}</span>
      </div>
      <span className="text-[11px] font-semibold text-emerald-700">
        You save ₹{(originalPrice - salePrice).toLocaleString("en-IN")}
      </span>
    </div>
  );
};