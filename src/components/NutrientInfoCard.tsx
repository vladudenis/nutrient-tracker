import { round } from "@/lib/utilFuncs";
import { Settings } from "lucide-react";
import Link from "next/link";

export default function NutrientInfoCard({
  nutrientInfo,
  hidden,
  mealName,
  id,
  healthParams,
}: {
  nutrientInfo: any;
  hidden?: boolean;
  mealName?: string;
  id?: string;
  healthParams?: any;
}) {
  const fatCaloricValue = healthParams
    ? (healthParams.fatIntake / 900) * healthParams.caloricIntake
    : 0;
  const proteinCaloricValue = healthParams
    ? (healthParams.proteinIntake / 400) * healthParams.caloricIntake
    : 0;
  const carbsCaloricValue = healthParams
    ? (healthParams.carbsIntake / 400) * healthParams.caloricIntake
    : 0;

  const parsed = nutrientInfo?.ingredients[0].parsed;
  let foodName;

  if (parsed) {
    foodName = parsed[0].foodMatch;
  }

  if (!parsed) {
    return (
      <div className="flex p-4 rounded-lg shadow-md hover:shadow-2xl border transition-shadow">
        <h1 className="text-lg text-red-600 font-semibold">
          The food that you entered could not be parsed!
        </h1>
      </div>
    );
  }

  const { totalWeight, calories, totalNutrients, totalDaily } = nutrientInfo;

  return (
    <div
      id={`${id ? id : "nutrientInfo"}`}
      className={`w-[500px] flex flex-col rounded-lg shadow-md hover:shadow-2xl duration-500 border py-2 px-3 transition-shadow animate-jump-in animate-once animate-duration-[400ms] animate-delay-100 animate-ease-in-out${
        hidden && " hidden"
      }`}
    >
      <h1 className="text-3xl border-b-2 font-semibold capitalize leading-10">
        {mealName || foodName} ({round(totalWeight)}g)
      </h1>
      <div className="border-b-4 pt-1">
        <span className="flex justify-between">
          <h1 className="text-2xl">Calories</h1>
          <h1 className="text-2xl">{calories}kcal</h1>
        </span>
        <span className="flex justify-between pt-2">
          <p></p>
          <p>% Daily Value</p>
        </span>
        <ul>
          <li className="flex justify-between border-y">
            <span className="flex gap-2 capitalize">
              <p className="font-semibold">
                {totalNutrients.FAT?.label || "Total Lipid (Fat)"}
              </p>{" "}
              {round(totalNutrients.FAT?.quantity || 0)}
              {totalNutrients.FAT?.unit || "g"}
            </span>
            <p className="flex items-center gap-1">
              {healthParams && (
                <Link href="/plan">
                  <Settings className="h-5 w-5" />
                </Link>
              )}
              {healthParams
                ? round(
                    ((totalNutrients.FAT?.quantity || 0) * fatCaloricValue) /
                      100
                  )
                : round(totalDaily.FAT?.quantity || 0)}
              {totalDaily.FAT?.unit || "%"}
            </p>
          </li>
          <li className="flex justify-between border-b">
            <span className="capitalize pl-8 flex gap-2">
              <p>
                {totalNutrients.FASAT?.label?.split(", ")[1] ||
                  "Total Saturated"}
              </p>{" "}
              {round(totalNutrients.FASAT?.quantity || 0)}
              {totalNutrients.FASAT?.unit || "g"}
            </span>
            <p>
              {round(totalDaily.FASAT?.quantity || 0)}
              {totalDaily.FASAT?.unit || "%"}
            </p>
          </li>
          <li className="flex justify-between border-b">
            <span className="capitalize pl-8 flex gap-2">
              <p>
                {totalNutrients.FAMS?.label?.split(", ")[1] ||
                  "Total Monosaturated"}
              </p>{" "}
              {round(totalNutrients.FAMS?.quantity || 0)}
              {totalNutrients.FAMS?.unit || "g"}
            </span>
            <p></p>
          </li>
          <li className="flex justify-between border-b">
            <span className="capitalize pl-8 flex gap-2">
              <p>
                {totalNutrients.FAPU?.label?.split(", ")[1] ||
                  "Total Polyunsaturated"}
              </p>{" "}
              {round(totalNutrients.FAPU?.quantity || 0)}
              {totalNutrients.FAPU?.unit || "g"}
            </span>
            <p></p>
          </li>
          <li className="flex justify-between border-b">
            <span className="flex gap-2">
              <p className="font-semibold">
                {totalNutrients.CHOCDF?.label?.split(", ")[0] || "Carbohydrate"}
              </p>{" "}
              {round(totalNutrients.CHOCDF?.quantity || 0)}
              {totalNutrients.CHOCDF?.unit || "g"}
            </span>
            <p className="flex items-center gap-1">
              {healthParams && (
                <Link href="/plan">
                  <Settings className="h-5 w-5" />
                </Link>
              )}
              {healthParams
                ? round(
                    ((totalNutrients.CHOCDF?.quantity || 0) /
                      carbsCaloricValue) *
                      100
                  )
                : round(totalDaily.CHOCDF?.quantity || 0)}
              {totalDaily.CHOCDF?.unit || "%"}
            </p>
          </li>
          <li className="flex justify-between border-b">
            <span className="flex gap-2">
              <p className="font-semibold">
                {totalNutrients.PROCNT?.label || "Protein"}
              </p>{" "}
              {round(totalNutrients.PROCNT?.quantity || 0)}
              {totalNutrients.PROCNT?.unit || "g"}
            </span>
            <p className="flex items-center gap-1">
              {healthParams && (
                <Link href="/plan">
                  <Settings className="h-5 w-5" />
                </Link>
              )}
              {healthParams
                ? round(
                    ((totalNutrients.PROCNT?.quantity || 0) /
                      proteinCaloricValue) *
                      100
                  )
                : round(totalDaily.PROCNT?.quantity || 0)}
              {totalDaily.PROCNT?.unit || "%"}
            </p>
          </li>
          <li className="flex justify-between">
            <span className="flex gap-2">
              <p className="font-semibold">
                {totalNutrients.CHOLE?.label || "Cholesterol"}
              </p>{" "}
              {round(totalNutrients.CHOLE?.quantity || 0)}
              {totalNutrients.CHOLE?.unit || "mg"}
            </span>
            <p>
              {round(totalDaily.CHOLE?.quantity || 0)}
              {totalDaily.CHOLE?.unit || "%"}
            </p>
          </li>
        </ul>
      </div>
      <div>
        <ul>
          <li className="flex justify-between border-b">
            <span className="flex gap-2">
              <p>{totalNutrients.NA?.label?.split(", ")[0] || "Sodium"}</p>{" "}
              {round(totalNutrients.NA?.quantity || 0)}
              {totalNutrients.NA?.unit || "mg"}
            </span>
            <p>
              {round(totalDaily.NA?.quantity || 0)}
              {totalDaily.NA?.unit || "%"}
            </p>
          </li>
          <li className="flex justify-between border-b">
            <span className="flex gap-2">
              <p>{totalNutrients.CA?.label?.split(", ")[0] || "Calcium"}</p>{" "}
              {round(totalNutrients.CA?.quantity || 0)}
              {totalNutrients.CA?.unit || "mg"}
            </span>
            <p>
              {round(totalDaily.CA?.quantity || 0)}
              {totalDaily.CA?.unit || "%"}
            </p>
          </li>
          <li className="flex justify-between border-b">
            <span className="flex gap-2">
              <p>{totalNutrients.MG?.label?.split(", ")[0] || "Magnesium"}</p>{" "}
              {round(totalNutrients.MG?.quantity || 0)}
              {totalNutrients.MG?.unit || "mg"}
            </span>
            <p>
              {round(totalDaily.MG?.quantity || 0)}
              {totalDaily.MG?.unit || "%"}
            </p>
          </li>
          <li className="flex justify-between border-b">
            <span className="flex gap-2">
              <p>{totalNutrients.K?.label?.split(", ")[0] || "Potassium"}</p>{" "}
              {round(totalNutrients.K?.quantity || 0)}
              {totalNutrients.K?.unit || "mg"}
            </span>
            <p>
              {round(totalDaily.K?.quantity || 0)}
              {totalDaily.K?.unit || "%"}
            </p>
          </li>
          <li className="flex justify-between border-b">
            <span className="flex gap-2">
              <p>{totalNutrients.FE?.label?.split(", ")[0] || "Iron"}</p>{" "}
              {round(totalNutrients.FE?.quantity || 0)}
              {totalNutrients.FE?.unit || "mg"}
            </span>
            <p>
              {round(totalDaily.FE?.quantity || 0)}
              {totalDaily.FE?.unit || "%"}
            </p>
          </li>
          <li className="flex justify-between border-b">
            <span className="flex gap-2">
              <p>{totalNutrients.ZN?.label?.split(", ")[0] || "Zinc"}</p>{" "}
              {round(totalNutrients.ZN?.quantity || 0)}
              {totalNutrients.ZN?.unit || "mg"}
            </span>
            <p>
              {round(totalDaily.ZN?.quantity || 0)}
              {totalDaily.ZN?.unit || "%"}
            </p>
          </li>
          <li className="flex justify-between border-b">
            <span className="flex gap-2">
              <p>{totalNutrients.P?.label?.split(", ")[0] || "Phosphorus"}</p>{" "}
              {round(totalNutrients.P?.quantity || 0)}
              {totalNutrients.P?.unit || "mg"}
            </span>
            <p>
              {round(totalDaily.P?.quantity || 0)}
              {totalDaily.P?.unit || "%"}
            </p>
          </li>
          <li className="flex justify-between border-b">
            <span className="flex gap-2">
              <p>{totalNutrients.VITC?.label?.split(", ")[0] || "Vitamin C"}</p>{" "}
              {round(totalNutrients.VITC?.quantity || 0)}
              {totalNutrients.VITC?.unit || "mg"}
            </span>
            <p>
              {round(totalDaily.VITC?.quantity || 0)}
              {totalDaily.VITC?.unit || "%"}
            </p>
          </li>
          <li className="flex justify-between border-b">
            <span className="flex gap-2">
              <p>{totalNutrients.THIA?.label || "Thiamin"}</p>{" "}
              {round(totalNutrients.THIA?.quantity || 0)}
              {totalNutrients.THIA?.unit || "mg"}
            </span>
            <p>
              {round(totalDaily.THIA?.quantity || 0)}
              {totalDaily.THIA?.unit || "%"}
            </p>
          </li>
          <li className="flex justify-between border-b">
            <span className="flex gap-2">
              <p>{totalNutrients.RIBF?.label || "Riboflavin"}</p>{" "}
              {round(totalNutrients.RIBF?.quantity || 0)}
              {totalNutrients.RIBF?.unit || "mg"}
            </span>
            <p>
              {round(totalDaily.RIBF?.quantity || 0)}
              {totalDaily.RIBF?.unit || "%"}
            </p>
          </li>
          <li className="flex justify-between border-b">
            <span className="flex gap-2">
              <p>{totalNutrients.NIA?.label || "Niacin"}</p>{" "}
              {round(totalNutrients.NIA?.quantity || 0)}
              {totalNutrients.NIA?.unit || "mg"}
            </span>
            <p>
              {round(totalDaily.NIA?.quantity || 0)}
              {totalDaily.NIA?.unit || "%"}
            </p>
          </li>
          <li className="flex justify-between border-b">
            <span className="flex gap-2">
              <p>{totalNutrients.VITB6A?.label || "Vitamin B-6"}</p>{" "}
              {round(totalNutrients.VITB6A?.quantity || 0)}
              {totalNutrients.VITB6A?.unit || "mg"}
            </span>
            <p>
              {round(totalDaily.VITB6A?.quantity || 0)}
              {totalDaily.VITB6A?.unit || "%"}
            </p>
          </li>
          <li className="flex justify-between border-b">
            <span className="flex gap-2">
              <p>{totalNutrients.FOLDFE?.label?.split(", ")[0] || "Folate"}</p>{" "}
              {round(totalNutrients.FOLDFE?.quantity || 0)}
              {totalNutrients.FOLDFE?.unit || "µg"}
            </span>
            <p>
              {round(totalDaily.FOLDFE?.quantity || 0)}
              {totalDaily.FOLDFE?.unit || "%"}
            </p>
          </li>
          <li className="flex justify-between border-b capitalize">
            <span className="flex gap-2">
              <p>{totalNutrients.FOLAC?.label || "Folic Acid"}</p>{" "}
              {round(totalNutrients.FOLAC?.quantity || 0)}
              {totalNutrients.FOLAC?.unit || "µg"}
            </span>
            <p></p>
          </li>
          <li className="flex justify-between border-b">
            <span className="flex gap-2">
              <p>{totalNutrients.VITB12?.label || "Vitamin B-12"}</p>{" "}
              {round(totalNutrients.VITB12?.quantity || 0)}
              {totalNutrients.VITB12?.unit || "µg"}
            </span>
            <p>
              {round(totalDaily.VITB12?.quantity || 0)}
              {totalDaily.VITB12?.unit || "%"}
            </p>
          </li>
          <li className="flex justify-between">
            <span className="flex gap-2">
              <p>{totalNutrients.VITD?.label || "Vitamin D (D2 + D3)"}</p>{" "}
              {round(totalNutrients.VITD?.quantity || 0)}
              {totalNutrients.VITD?.unit || "µg"}
            </span>
            <p>
              {round(totalDaily.VITD?.quantity || 0)}
              {totalDaily.VITD?.unit || "%"}
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}
