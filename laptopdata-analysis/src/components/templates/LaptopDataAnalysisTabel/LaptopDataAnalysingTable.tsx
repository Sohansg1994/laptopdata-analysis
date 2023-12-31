import { ChangeEvent, useEffect, useState } from "react";
import SelectMenu from "../../atoms/selectMenu/SelectMenu";
import AdvanceSearchBar from "../../organisms/AdvanceSearchBar/AdvanceSearchBar";
import SearchBox from "../../atoms/searchBox/SearchBox";
import DropButton from "../../atoms/dropButton/DropButton";
import laptopStore from "../../../store";
import DataLoadButton from "../../atoms/dataLoadButton/DataLoadButton";
import DataTable from "../../organisms/dataTable/DataTable";

export default function LaptopDataAnalysingTable() {
  const [searchValue, setSearchValue] = useState<any>("");
  const [selectedOption, setSelectedOption] = useState<Number>(1);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isDataEdited = laptopStore((state) => state.isDataEdited);
  const rawData = laptopStore((state) => state.rawData);
  const addBrands = laptopStore((state) => state.addBrands);
  const clearBrandData = laptopStore((state) => state.clearBrandData);
  const setTableData = laptopStore((state) => state.setTableData);
  const isDataLoaded = laptopStore((state) => state.isDataLoaded);
  const setDescendingOrder = laptopStore((state) => state.setDescendingOrder);

  // set brand list list
  useEffect(() => {
    const uniqueBrands = [
      ...new Set(rawData.map((product: any) => product.Company)),
    ];
    clearBrandData();
    addBrands(uniqueBrands);
  }, [rawData, isDataEdited]);

  //functioning filtering data function
  useEffect(() => {
    handleFilter(searchValue, selectedOption);
    setDescendingOrder();
  }, [searchValue]);

  //set search values
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  //filtering data respect to selection
  const handleFilter = (searchValue: string, selectedOption: Number) => {
    let option = "Company";
    switch (selectedOption) {
      case 1:
        option = "Company";
        break;

      case 2:
        option = "Product";
        break;
      case 3:
        option = "TypeName";
        break;

      default:
        break;
    }
    const newData = rawData.filter((laptop: any) => {
      return laptop[option]?.toLowerCase()?.includes(searchValue.toLowerCase());
    });
    setTableData(newData);
  };

  return (
    <div className="w-screen flex justify-center min-w-1350">
      <div className="grid grid-cols-6 gap-4 w-5/6 ">
        <div className="col-start-1 col-span-6 border-2 border-gray-300 bg-white mt-3 mb-10 relative  shadow-md sm:rounded-lg">
          <div className="flex justify-between mt-3 ml-5">
            <div className="flex mr-4 flex-wrap">
              <div className=" w-auto h-auto ">
                <SelectMenu setSelected={setSelectedOption} />
              </div>
              <div>
                <SearchBox
                  name="price"
                  id="price"
                  value={searchValue}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="mt-2 ml-3 mr-3">
                <DropButton setIsOpen={setIsOpen} />
              </div>
              <div className="mt-2  mb-4">
                <DataLoadButton />
              </div>
            </div>
          </div>
          {isOpen && <AdvanceSearchBar />}
        </div>
        {isDataLoaded && (
          <div className="col-start-1 col-span-6  ">
            <DataTable />
          </div>
        )}
      </div>
    </div>
  );
}
