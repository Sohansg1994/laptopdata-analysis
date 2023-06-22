import { useEffect, useState, ChangeEvent } from "react";
import BrandSelectionMenu from "../../atoms/brandSelectionMenu/BrandSelectionMenu";
import SearchButton from "../../atoms/SearchButton/SearchButton";
import SortingButton from "../../atoms/sortingButton/SortingButton";
import PriceBox from "../../atoms/priceBox/PriceBox";

export default function AdvanceSearchBar(props: any) {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [isAscending, setIsAscending] = useState<boolean>(true);

  useEffect(() => {
    console.log(isAscending);
  }, [isAscending]);

  const handleMinValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    const minValue = parseFloat(event.target.value);
    setMinPrice(minValue);
  };
  const handleMaxValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    const maxValue = parseFloat(event.target.value);
    setMaxPrice(maxValue);
    console.log(maxPrice);
  };

  const handleClick = () => {
    console.log(selectedOption);
    if (selectedOption != "Any") {
      const newData = props.initialData.filter((laptop: any) => {
        const laptopPrice = parseInt(laptop.Price_in_euros);

        return (
          laptopPrice >= minPrice &&
          laptopPrice <= maxPrice &&
          laptop.Company.toLowerCase().includes(selectedOption.toLowerCase())
        );
      });

      props.setLaptopData(newData);
      console.log(newData);
    } else if (selectedOption === "Any") {
      const newData = props.initialData.filter((laptop: any) => {
        const laptopPrice = parseInt(laptop.Price_in_euros);

        return (
          laptopPrice >= minPrice &&
          laptopPrice <= maxPrice &&
          laptop.Company.toLowerCase()
        );
      });

      props.setLaptopData(newData);
      console.log(newData);
    }
  };

  const handleSortData = () => {
    if (isAscending) {
      const newData = props.laptopData.sort((a: any, b: any) => {
        let laptopPriceA = parseInt(a.Price_in_euros);
        let laptopPriceB = parseInt(b.Price_in_euros);

        if (laptopPriceA < laptopPriceB) {
          return -1;
        } else if (laptopPriceA > laptopPriceB) {
          return 1;
        } else {
          return 0;
        }
      });

      props.setLaptopData(newData);
      props.setTrigger(!props.trigger);
      setIsAscending(!isAscending);
    } else {
      const newData = props.laptopData.sort((a: any, b: any) => {
        let laptopPriceA = parseInt(a.Price_in_euros);
        let laptopPriceB = parseInt(b.Price_in_euros);

        if (laptopPriceA > laptopPriceB) {
          return -1;
        } else if (laptopPriceA < laptopPriceB) {
          return 1;
        } else {
          return 0;
        }
      });

      props.setLaptopData(newData);
      props.setTrigger(!props.trigger);
      setIsAscending(!isAscending);
    }
  };

  return (
    <div className="flex justify-start gap-x-5 shadow-lg  bg-gray-50 border-t dark:bg-gray-800 dark:border-gray-700 mt-3  px-4 pt-3 pb-5 sm:rounded-lg ">
      <div className="flex flex-col  w-fit ">
        <div className="flex font-sans font-medium ml-1">Price Range</div>
        <div className="flex gap-x-2">
          <PriceBox placeholder={"Min"} onChange={handleMinValueChange} />
          <PriceBox placeholder={"Max"} onChange={handleMaxValueChange} />
        </div>
      </div>

      <div className="flex flex-col  w-fit">
        <div className="flex font-sans font-medium ml-3">Brand</div>
        <div>
          <BrandSelectionMenu setSelectedOption={setSelectedOption} />
        </div>
      </div>

      <div className="flex items-end  w-fit">
        <div>
          <SearchButton handleClick={handleClick} />
        </div>
      </div>
      <div className="flex items-end w-fit">
        <div>
          <SortingButton handleClick={handleSortData} />
        </div>
      </div>
    </div>
  );
}
