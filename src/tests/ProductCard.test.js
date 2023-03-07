import { render, screen, waitFor } from "@testing-library/react"
import ProductCard from "../components/ProductCard"
import axios from "axios"

jest.mock("axios")

const axiosResponseMock = {
    data: {
        title: "MacBookProTeste",
        description: "blabla",
        price: 2000,
        thumbnail: "https://i.dummyjson.com/data/products/6/thumbnail.png"
    }
}

describe("ProductCard", () => {
    test('renderizar o card de produtos', async () => {
        axios.get.mockResolvedValueOnce(axiosResponseMock)

        render(<ProductCard />)

        screen.debug()

        await waitFor(() => { })

        screen.debug()

    })

    test('renderizar o loading e garantir que não exista dados do produtos na renderização inicial', async () => {
        axios.get.mockResolvedValueOnce(axiosResponseMock)

        render(<ProductCard />)

        //screen.logTestingPlaygroundURL()
        const loading = screen.getByText(/loading\.\.\./i)
        expect(loading).toBeInTheDocument()

        expect(screen.queryByText(/macbookproteste/i)).not.toBeInTheDocument()

        await waitFor(() => { })

    })

    test('renderizar o card corretamente após o carregamento, garantindo que o loading não exista mais', async () => {
        axios.get.mockResolvedValueOnce(axiosResponseMock)

        render(<ProductCard />)

        await waitFor(() => {
            const title = screen.getByRole('heading', {
                name: /macbookproteste/i
            })
            expect(title).toBeInTheDocument()
            expect(
                screen.getByRole('img', {
                    name: /thumbnail for macbookproteste/i
                })
            ).toBeInTheDocument()
            expect(screen.getByText(/blabla/i)).toBeInTheDocument()
            expect(screen.getByText(/\$2000/i)).toBeInTheDocument()
        })

        expect(screen.queryByText("Loading...")).not.toBeInTheDocument()
        //screen.logTestingPlaygroundURL()
    })
})