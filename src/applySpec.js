export default function applySpec({ input, output, transform }) {
    return expect(input.map(transform)).toEqual(output)
}