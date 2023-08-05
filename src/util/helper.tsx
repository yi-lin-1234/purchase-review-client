import { Purchase, GroupedAttribute } from "../type";

export function groupPurchasesByCategory(purchases: Purchase[]) {
  if (!Array.isArray(purchases)) {
    throw new Error("Input should be an array");
  }

  const categoryCounts = purchases.reduce((acc: GroupedAttribute, purchase) => {
    const category = purchase.Category;

    // Validate that the category property exists and is a string
    if (typeof category !== "string") {
      throw new Error(
        "Each bug should have a category property of type string"
      );
    }

    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  return Object.keys(categoryCounts).map((category) => ({
    category: category,
    count: categoryCounts[category],
  }));
}

export function groupPurchasesByEvaluation(purchases: Purchase[]) {
  if (!Array.isArray(purchases)) {
    throw new Error("Input should be an array");
  }

  const evaluationCounts = purchases.reduce(
    (acc: GroupedAttribute, purchase) => {
      const evaluation = purchase.Evaluation;

      // Validate that the evaluation property exists and is a string
      if (typeof evaluation !== "string") {
        throw new Error(
          "Each purchase should have an evaluation property of type string"
        );
      }

      acc[evaluation] = (acc[evaluation] || 0) + 1;
      return acc;
    },
    {}
  );

  return Object.keys(evaluationCounts).map((evaluation) => ({
    evaluation: evaluation,
    count: evaluationCounts[evaluation],
  }));
}
