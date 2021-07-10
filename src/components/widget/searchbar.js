import { useState } from "react";
import { InputGroup } from "@paljs/ui";
import { EvaIcon } from "@paljs/ui";

export default function SearchBar(props) {

    const [searchInput, setSearchInput] = useState("")
    var typingSearchTimer;
    function onSearch() {
        if(!props?.isLoading) {
            props.onSearch(searchInput)
        }
    }

    return <div className="search-bar" style={{width: 200}}>
        <InputGroup fullWidth shape="SemiRound">
            <input 
                type="text" 
                placeholder="Search..." 
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyUp={(e) => {
                    clearTimeout(typingSearchTimer)
                    typingSearchTimer = setTimeout(onSearch, 500)
                }}
                onKeyDown={(e) => clearTimeout(typingSearchTimer)}
                disabled={props?.isLoading}
                readOnly={props?.isLoading}/>
        </InputGroup>
        <EvaIcon 
            className="search-icon" 
            name="search" 
            onClick={onSearch}
            options={{ fill: '#5a37b8' }} />
    </div>
}