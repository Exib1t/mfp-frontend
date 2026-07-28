import Typography from "@/components/controls/Typography/Typography";
import type { Product } from "@/entities/products/types";
import { groupAttributes, renderAttributeValue } from "./helpers";

import "./ProductSpecs.styles.scss";

interface ProductSpecsProps {
  product: Product;
}

const BASE_CLASS = "product-specs";

/** Characteristics table: typed attributes first, then free-form `specs`. */
function ProductSpecs({ product }: ProductSpecsProps) {
  const groups = groupAttributes(product.attributes);
  const specEntries = Object.entries(product.specs ?? {});

  if (groups.length === 0 && specEntries.length === 0) return null;

  return (
    <section className={BASE_CLASS}>
      <Typography variant="h4" as="h2" className={`${BASE_CLASS}_title`}>
        Характеристики
      </Typography>

      {groups.map((group) => (
        <div key={group.name} className={`${BASE_CLASS}_group`}>
          {group.name && (
            <Typography variant="overline" color="muted">
              {group.name}
            </Typography>
          )}
          <dl className={`${BASE_CLASS}_list`}>
            {group.attributes.map((attribute) => (
              <div key={attribute.id} className={`${BASE_CLASS}_row`}>
                <dt className={`${BASE_CLASS}_term`}>{attribute.name}</dt>
                <dd className={`${BASE_CLASS}_value`}>
                  {renderAttributeValue(attribute)}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ))}

      {specEntries.length > 0 && (
        <div className={`${BASE_CLASS}_group`}>
          <dl className={`${BASE_CLASS}_list`}>
            {specEntries.map(([key, value]) => (
              <div key={key} className={`${BASE_CLASS}_row`}>
                <dt className={`${BASE_CLASS}_term`}>{key}</dt>
                <dd className={`${BASE_CLASS}_value`}>{String(value)}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </section>
  );
}

export default ProductSpecs;
