export default function PetCard({ name, image, ...props }) {
  return (
    <div
      className={`
        bg-white border border-border-hover rounded-card overflow-hidden 
        flex flex-col items-center justify-between 
        transition-all duration-200
        hover:border-secondary hover:shadow-card hover:-translate-y-1
        cursor-pointer
        min-h-[220px] max-w-xs
      `}
      {...props}
    >
      {/* Bilde eller placeholder */}
      <div className="w-full h-32 bg-neutral-light flex items-center justify-center">
        {image ? (
          <img
            src={image}
            alt={name}
            className="object-cover w-full h-full rounded-t-card"
          />
        ) : (
          <span className="text-placeholder">No image</span>
        )}
      </div>
      {/* Navn */}
      <div className="w-full py-2 flex items-center justify-center">
        <span
          className="text-primary font-semibold text-base md:text-lg truncate"
          title={name}
        >
          {name}
        </span>
      </div>
    </div>
  );
}
