import { useEffect, useState } from "react"
import { Container, FloatingLabel, Form } from "react-bootstrap"
import { SearchProducts } from "./SearchProducts"
import { useDebounce } from "@uidotdev/usehooks"


export const SearchComponent = ({loggedInUser}) => {
    const [searchTerm, setSearchTerm] = useState("")
    const [searchedProducts, setSearchedProducts] = useState([])
    const [isSearching, setIsSearching] = useState(false)
    const debounceSearch = useDebounce(searchTerm, 500)

    useEffect(() => {
        const searchDb = async () => {
            setIsSearching(true)
            let results = []
            if (debounceSearch) {
                const request = await fetch(`https://localhost:7145/api/Products/search?q=${debounceSearch}`)
                const requestJSON = await request.json()
                const response = requestJSON
                results = response || []
            }
            setSearchedProducts(results)
            setIsSearching(false)
        }
        searchDb()
    }, [debounceSearch])
    
    const searchParams = (evt) => {
        let stateCopy = { ...searchTerm }
        stateCopy = evt.target.value.replace(/\s/g, '')
        setSearchTerm(stateCopy)
    }

    return (
        <Container>
            <h1 style={{textAlign: "center", marginBottom: "20px"}}>Search for products</h1>
            <FloatingLabel controlId="searchTerm" label="Search" className="mb-3">
                <Form.Control size="lg" type="input" onChange={(e) => { searchParams(e) }} placeholder="Search for products"/>
            </FloatingLabel>
            {
                !searchedProducts <= 0 ?
                    searchedProducts.map((search) => {
                        return (
                            <SearchProducts key={search.id} search={search} loggedInUser={loggedInUser} />
                        )
                    })
                : ""
            }
        </Container>
    )
}