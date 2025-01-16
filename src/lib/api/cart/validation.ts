import type { Cart, CartItem } from "../../types/cart";

export function validateCartItem(item: CartItem): {
  isValid: boolean;
  error?: string;
} {
  if (
    item.price === undefined ||
    typeof item.price !== "number" ||
    isNaN(item.price)
  ) {
    return { isValid: false, error: "Invalid price" };
  }

  if (
    !item.quantity ||
    typeof item.quantity !== "number" ||
    item.quantity < 1
  ) {
    return { isValid: false, error: "Invalid quantity" };
  }

  if (!item.name || typeof item.name !== "string") {
    return { isValid: false, error: "Invalid name" };
  }

  if (!item.category || typeof item.category !== "string") {
    return { isValid: false, error: "Invalid category" };
  }

  return { isValid: true };
}

export function validateCart(cart: Cart): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!cart.items.length) {
    errors.push("Cart is empty");
    return { isValid: false, errors };
  }

  cart.items.forEach((item, index) => {
    const validation = validateCartItem(item);
    if (!validation.isValid && validation.error) {
      errors.push(`Item ${index + 1}: ${validation.error}`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
}
