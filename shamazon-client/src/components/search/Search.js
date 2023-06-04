import { useState } from "react"
import { Container, FloatingLabel, Form } from "react-bootstrap"


export const SearchComponent = () => {
    const [searchTerm, setSearchTerm] = useState("")

    return (
        <Container>
            <FloatingLabel controlId="searchTerm" label="Search Bar" className="mb-3">
                <Form.Control size="lg" type="input" onChange={(e) => { setSearchTerm(e.target.id = e.target.value) }} placeholder="Search" />
            </FloatingLabel>
        </Container>
    )
}