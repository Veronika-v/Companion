import React from 'react';
import CategoryDropdown from "./CategoryDropdown";

export default function HomeFilter({searchValue, onSearchValueChange, selectValue, setSelectValue}){

    const onSearchChange = (e) => {
        onSearchValueChange(e.target.value);
    }


    return (
        <div className="filter">
            <div className="row top ">
                <div className="column-1 left search">
                    <input type="text" value={searchValue} onChange={onSearchChange} placeholder='Search...'/>
                </div>
                <div className="column-2 medium">
                    <CategoryDropdown selectValue={selectValue} onSelectValueChange={setSelectValue}/>
                </div>
            </div>
        </div>
    )
}