import { render, screen, waitFor } from "@testing-library/react"
import axios from "axios"
import UserCard from "../components/UserCard"

jest.mock("axios")

const axiosResponseMock = {
    data: {
        firstName: "Teste",
        lastName: "teste2",
        bank:
        {
            cardNumber: "3589640949470047",
            cardExpire: "10/23"
        }
    }
}

describe("UserCard", () => {
    test('renderizar inicialmente com loading e remover após o carregamento', async () => {
        axios.get.mockResolvedValueOnce(axiosResponseMock)
        
        render(<UserCard/>)

        const loading = screen.getByText(/loading\.\.\./i)
        expect(loading).toBeInTheDocument()

        await waitFor(() => { })

        expect(screen.queryByText("Loading...")).not.toBeInTheDocument()

    })

    test('renderizar os dados do cartão corretamente', async () => {
        axios.get.mockResolvedValueOnce(axiosResponseMock)
        
        render(<UserCard/>)

        await waitFor(() => {
            expect(screen.getByText(/teste teste2/i)).toBeInTheDocument()
            expect(screen.getByText(/3589 6409 4947 0047/i)).toBeInTheDocument()
            expect(screen.getByText(/10\/23/i)).toBeInTheDocument()
        })

        expect(screen.queryByText("Loading...")).not.toBeInTheDocument()
        //screen.logTestingPlaygroundURL()
    })
})