const fruits = ["Bananas", "Apples", "Strawberries", "Grapes", "Oranges"]

export default function FruitList() {

    return (

        <section>

            <h1>Fruits</h1>

            <ul aria-label="fruits">

                {fruits.map(fruit => (

                    <li key={fruit}>{fruit}</li>

                ))}

            </ul>

        </section>

    )

}