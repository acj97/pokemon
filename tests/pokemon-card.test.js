/** @jest-environment jsdom */
import { render, screen } from "./test-utils";
import PokemonCard from "@pages/components/pokemon-card";

describe("Pokemon Card", () => {
  it("should render the children", () => {
    render(<PokemonCard 
      onClick={() => {
        router.push({
          pathname: '/pokemon-detail',
          query: { name: pokemon.name }
        })
      }}>
        <p>test text</p>
      </PokemonCard>);

    const heading = screen.getByText(
      /test text/i
    );

    // we can only use toBeInTheDocument because it was imported
    // in the jest.setup.js and configured in jest.config.js
    expect(heading).toBeInTheDocument();
  });
});