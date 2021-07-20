import { Select } from "@paljs/ui";
import { useState } from "react";

export default function SelectCustom(props) {

    var typingSearchTimer;
    function onSearch(s) {
        if(!props?.isLoading) {
            props?.onInputChange(s)
        }
    }

    return <Select 
        size="Small" 
        options={props?.options}
        name="invoiceNumber"
        value={props?.value}
        onInputChange={(val, m) => {
            clearTimeout(typingSearchTimer)
            typingSearchTimer = setTimeout(() => onSearch(val), 1000)
        }}
        onChange={(val) => props?.onChange(val)}
        placeholder={props?.placeholder} />
}