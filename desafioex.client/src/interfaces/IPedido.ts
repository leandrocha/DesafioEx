import ICliente from "./ICliente";
import IProduto from "./IProduto";

export default interface IPedido {
    cliente: ICliente,
    produto: IProduto,
    numero: number,
    data: Date
}