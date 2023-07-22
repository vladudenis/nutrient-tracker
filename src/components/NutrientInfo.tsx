function round(num: number) {
  return Math.round(num * 10) / 10;
}

export default function NutrientInfo({ nutrientInfo }: { nutrientInfo: any }) {
  const foodName = nutrientInfo?.ingredients[0].parsed[0].foodMatch;
  const { totalWeight, calories, totalNutrients, totalDaily } = nutrientInfo;

  return (
    <div className="w-[500px] flex flex-col rounded-lg shadow-md hover:shadow-2xl border py-2 px-3 transition-shadow">
      <h1 className="text-3xl border-b-2 font-semibold capitalize leading-10">
        {foodName} ({round(totalWeight)}g)
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
              <p className="font-semibold">{totalNutrients.FAT.label}</p>{" "}
              {round(totalNutrients.FAT.quantity)}
              {totalNutrients.FAT.unit}
            </span>
            <p>
              {round(totalDaily.FAT.quantity)}
              {totalDaily.FAT.unit}
            </p>
          </li>
          <li className="flex justify-between border-b">
            <span className="capitalize pl-8 flex gap-2">
              <p>{totalNutrients.FASAT.label.split(", ")[1]}</p>{" "}
              {round(totalNutrients.FASAT.quantity)}
              {totalNutrients.FASAT.unit}
            </span>
            <p>
              {round(totalDaily.FASAT.quantity)}
              {totalDaily.FASAT.unit}
            </p>
          </li>
          <li className="flex justify-between border-b">
            <span className="capitalize pl-8 flex gap-2">
              <p>{totalNutrients.FAMS.label.split(", ")[1]}</p>{" "}
              {round(totalNutrients.FAMS.quantity)}
              {totalNutrients.FAMS.unit}
            </span>
            <p></p>
          </li>
          <li className="flex justify-between border-b">
            <span className="capitalize pl-8 flex gap-2">
              <p>{totalNutrients.FAPU.label.split(", ")[1]}</p>{" "}
              {round(totalNutrients.FAPU.quantity)}
              {totalNutrients.FAPU.unit}
            </span>
            <p></p>
          </li>
          <li className="flex justify-between border-b">
            <span className="flex gap-2">
              <p className="font-semibold">
                {totalNutrients.CHOCDF.label.split(", ")[0]}
              </p>{" "}
              {round(totalNutrients.CHOCDF.quantity)}
              {totalNutrients.CHOCDF.unit}
            </span>
            <p>
              {round(totalDaily.CHOCDF.quantity)}
              {totalDaily.CHOCDF.unit}
            </p>
          </li>
          <li className="flex justify-between border-b">
            <span className="flex gap-2">
              <p className="font-semibold">{totalNutrients.PROCNT.label}</p>{" "}
              {round(totalNutrients.PROCNT.quantity)}
              {totalNutrients.PROCNT.unit}
            </span>
            <p>
              {round(totalDaily.PROCNT.quantity)}
              {totalDaily.PROCNT.unit}
            </p>
          </li>
          <li className="flex justify-between">
            <span className="flex gap-2">
              <p className="font-semibold">{totalNutrients.CHOLE.label}</p>{" "}
              {round(totalNutrients.CHOLE.quantity)}
              {totalNutrients.CHOLE.unit}
            </span>
            <p>
              {round(totalDaily.CHOLE.quantity)}
              {totalDaily.CHOLE.unit}
            </p>
          </li>
        </ul>
      </div>
      <div>
        <ul>
          <li className="flex justify-between border-b">
            <span className="flex gap-2">
              <p>{totalNutrients.NA.label.split(", ")[0]}</p>{" "}
              {round(totalNutrients.NA.quantity)}
              {totalNutrients.NA.unit}
            </span>
            <p>
              {round(totalDaily.NA.quantity)}
              {totalDaily.NA.unit}
            </p>
          </li>
          <li className="flex justify-between border-b">
            <span className="flex gap-2">
              <p>{totalNutrients.CA.label.split(", ")[0]}</p>{" "}
              {round(totalNutrients.CA.quantity)}
              {totalNutrients.CA.unit}
            </span>
            <p>
              {round(totalDaily.CA.quantity)}
              {totalDaily.CA.unit}
            </p>
          </li>
          <li className="flex justify-between border-b">
            <span className="flex gap-2">
              <p>{totalNutrients.MG.label.split(", ")[0]}</p>{" "}
              {round(totalNutrients.MG.quantity)}
              {totalNutrients.MG.unit}
            </span>
            <p>
              {round(totalDaily.MG.quantity)}
              {totalDaily.MG.unit}
            </p>
          </li>
          <li className="flex justify-between border-b">
            <span className="flex gap-2">
              <p>{totalNutrients.K.label.split(", ")[0]}</p>{" "}
              {round(totalNutrients.K.quantity)}
              {totalNutrients.K.unit}
            </span>
            <p>
              {round(totalDaily.K.quantity)}
              {totalDaily.K.unit}
            </p>
          </li>
          <li className="flex justify-between border-b">
            <span className="flex gap-2">
              <p>{totalNutrients.FE.label.split(", ")[0]}</p>{" "}
              {round(totalNutrients.FE.quantity)}
              {totalNutrients.FE.unit}
            </span>
            <p>
              {round(totalDaily.FE.quantity)}
              {totalDaily.FE.unit}
            </p>
          </li>
          <li className="flex justify-between border-b">
            <span className="flex gap-2">
              <p>{totalNutrients.ZN.label.split(", ")[0]}</p>{" "}
              {round(totalNutrients.ZN.quantity)}
              {totalNutrients.ZN.unit}
            </span>
            <p>
              {round(totalDaily.ZN.quantity)}
              {totalDaily.ZN.unit}
            </p>
          </li>
          <li className="flex justify-between border-b">
            <span className="flex gap-2">
              <p>{totalNutrients.P.label.split(", ")[0]}</p>{" "}
              {round(totalNutrients.P.quantity)}
              {totalNutrients.P.unit}
            </span>
            <p>
              {round(totalDaily.P.quantity)}
              {totalDaily.P.unit}
            </p>
          </li>
          <li className="flex justify-between border-b">
            <span className="flex gap-2">
              <p>{totalNutrients.VITC.label.split(", ")[0]}</p>{" "}
              {round(totalNutrients.VITC.quantity)}
              {totalNutrients.VITC.unit}
            </span>
            <p>
              {round(totalDaily.VITC.quantity)}
              {totalDaily.VITC.unit}
            </p>
          </li>
          <li className="flex justify-between border-b">
            <span className="flex gap-2">
              <p>{totalNutrients.THIA.label}</p>{" "}
              {round(totalNutrients.THIA.quantity)}
              {totalNutrients.THIA.unit}
            </span>
            <p>
              {round(totalDaily.THIA.quantity)}
              {totalDaily.THIA.unit}
            </p>
          </li>
          <li className="flex justify-between border-b">
            <span className="flex gap-2">
              <p>{totalNutrients.RIBF.label}</p>{" "}
              {round(totalNutrients.RIBF.quantity)}
              {totalNutrients.RIBF.unit}
            </span>
            <p>
              {round(totalDaily.RIBF.quantity)}
              {totalDaily.RIBF.unit}
            </p>
          </li>
          <li className="flex justify-between border-b">
            <span className="flex gap-2">
              <p>{totalNutrients.NIA.label}</p>{" "}
              {round(totalNutrients.NIA.quantity)}
              {totalNutrients.NIA.unit}
            </span>
            <p>
              {round(totalDaily.NIA.quantity)}
              {totalDaily.NIA.unit}
            </p>
          </li>
          <li className="flex justify-between border-b">
            <span className="flex gap-2">
              <p>{totalNutrients.VITB6A.label}</p>{" "}
              {round(totalNutrients.VITB6A.quantity)}
              {totalNutrients.VITB6A.unit}
            </span>
            <p>
              {round(totalDaily.VITB6A.quantity)}
              {totalDaily.VITB6A.unit}
            </p>
          </li>
          <li className="flex justify-between border-b">
            <span className="flex gap-2">
              <p>{totalNutrients.FOLDFE.label.split(", ")[0]}</p>{" "}
              {round(totalNutrients.FOLDFE.quantity)}
              {totalNutrients.FOLDFE.unit}
            </span>
            <p>
              {round(totalDaily.FOLDFE.quantity)}
              {totalDaily.FOLDFE.unit}
            </p>
          </li>
          <li className="flex justify-between border-b">
            <span className="flex gap-2">
              <p>{totalNutrients.FOLAC.label}</p>{" "}
              {round(totalNutrients.FOLAC.quantity)}
              {totalNutrients.FOLAC.unit}
            </span>
            <p></p>
          </li>
          <li className="flex justify-between border-b">
            <span className="flex gap-2">
              <p>{totalNutrients.VITB12.label}</p>{" "}
              {round(totalNutrients.VITB12.quantity)}
              {totalNutrients.VITB12.unit}
            </span>
            <p>
              {round(totalDaily.VITB12.quantity)}
              {totalDaily.VITB12.unit}
            </p>
          </li>
          <li className="flex justify-between">
            <span className="flex gap-2">
              <p>{totalNutrients.VITD.label}</p>{" "}
              {round(totalNutrients.VITD.quantity)}
              {totalNutrients.VITD.unit}
            </span>
            <p>
              {round(totalDaily.VITD.quantity)}
              {totalDaily.VITD.unit}
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}
