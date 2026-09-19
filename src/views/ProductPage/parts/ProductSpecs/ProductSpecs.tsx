import Typography from "@/components/controls/Typography/Typography";
import type { Product } from "@/entities/products/types";
import { groupAttributes, renderAttributeValue } from "./helpers";

import "./ProductSpecs.styles.scss";

interface ProductSpecsProps {
  product: Product;
}

const BASE_CLASS = "product-specs";

/** Characteristics table, grouped by `group_name`. */
function ProductSpecs({ product }: ProductSpecsProps) {
  const groups = groupAttributes(product.attributes);

  if (groups.length === 0) return null;

  /*
   * Attributes with no `group_name` come back as one unnamed group, always
   * first. Left unlabelled it was the only table on the page without a heading
   * while "Матеріали" and "Розміри" below it had one — so it gets the name it
   * actually has. Only when there is something to tell it apart from: a lone
   * unnamed group needs no heading at all.
   */
  const hasNamedGroups = groups.some((group) => group.name);

  return (
    <section className={BASE_CLASS}>
      <Typography variant="h4" as="h2" className={`${BASE_CLASS}_title`}>
        Характеристики
      </Typography>

      {groups.map((group) => (
        <div key={group.name} className={`${BASE_CLASS}_group`}>
          {(group.name || hasNamedGroups) && (
            <Typography variant="overline" color="muted">
              {group.name || "Загальні"}
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
    </section>
  );
}

export default ProductSpecs;
