export default function NutrientInfo({ nutrientInfo }: { nutrientInfo: any }) {
  const foodName = nutrientInfo?.ingredients[0].parsed[0].foodMatch;
  const weight = nutrientInfo?.totalWeight;
  const calories = nutrientInfo?.calories;
  const totalNutrients = nutrientInfo?.totalNutrients;
  const totalDaily = nutrientInfo?.totalDaily;

  return (
    <div className="w-[500px] flex flex-col">
      <h1 className="text-xl">
        {foodName} ({weight}g)
      </h1>
      <div>
        <span className="flex justify-between">
          <h1 className="text-lg">Calories</h1>
          <h1 className="text-lg">{calories}</h1>
        </span>
        <span className="flex justify-between">
          <p></p>
          <p>% Daily Value</p>
        </span>
        <ul></ul>
      </div>
      <div>
        <ul></ul>
      </div>
    </div>
  );
}
