import React from "react"

import { render, screen, within } from "@testing-library/react"
import FruitList from "./FruitList";
import Todo from "./Todo";
import Board from "./Board";

it("should render list of 5 fruits", () => {

    render(<FruitList/>)

    const list = screen.getByRole("list", {

        name: /fruits/i,

    })

    const { getAllByRole } = within(list)

    const items = getAllByRole("listitem")

    expect(items.length).toBe(5)

})

