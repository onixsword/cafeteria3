var NumeroDePedidos = 0

function actualizarTotal(){
    var total = 0;
    $.each($(".subtotal"), function(indice, valor) {
        total += Number($(this).text(),)
    })
    $("#cellTotal").text(total);
}

function agregarElemento(nombreABuscar, cantidad){
    encontroElElemento = false;

    $.each($(".Pedido"), function(indice, valor){
        if($(this).find(".nombreDeProducto").text() == nombreABuscar) {
            var nuevaCantidad =Number($(this).find(".numeroDeElementos").text()) + cantidad;
            $(this).find(".numeroDeElementos").text(nuevaCantidad);
            var precio = $("#slcComida option[value='" + $("#slcComida").val() +  "']").attr("precio");
            var subtotal = precio * nuevaCantidad;
            $(this).find(".subtotal").text(subtotal);
            encontroElElemento = true;
        }
    })

    return encontroElElemento;
}

function agregarProducto(nombreDeProducto, cantidad){

    var idComida = $("#slcComida option[value='" + $("#slcComida").val() +  "']").attr("idComida");
    var precio = $("#slcComida option[value='" + $("#slcComida").val() +  "']").attr("precio");
    
    var subtotal = cantidad * precio;
    
    $("#tblPedido tbody").append(
        "<tr class='Pedido' id='Pedido" +NumeroDePedidos +"'>" + 
            "<td >" +
                "<span class='numeroDeElementos'>" +
                    cantidad + 
                "</span>" +
                '<input type="hidden" name="cantidades[]" value "' + cantidad + '">'+
            "</td>" +
            "<td class='nombreDeProducto'>" +
                nombreDeProducto + 
                '<input type="hidden" name="nombres[]" value "' + nombreDeProducto + '">'+
                '<input type="hidden" name="ids[]" value "' + idComida + '">'+
            "</td>" + 
            "<td>" +
                precio + 
                '<input type="hidden" name="precios[]" value "' + precio + '">'+
            "</td>" +
            '<td >' +
                '<span class="subtotal">' +
                    subtotal + 
                "</span>" +
                '<input type="hidden" name="subtotales[]" value "' + subtotal + '">'+
            "</td>" +
            "<td>" +
                '<button type="button" class="btnEliminarElemento btn btn-danger">X</button>' + 
            "</td>" +
        "</tr>");
        NumeroDePedidos++;
        $(".btnEliminarElemento").unbind("click");
        $(".btnEliminarElemento").click(doClickEliminarElemento);
}

function doClickAgregarElemento(e) {
    var nombreDeProducto = $("#slcComida option[value='" + $("#slcComida").val() +  "']").text();
    var cantidad = Number($("#txtCantidad").val());
    if(isNaN(cantidad))return false;
    if(cantidad <= 0) cantidad = 1;

    if(!agregarElemento(nombreDeProducto, cantidad)) agregarProducto(nombreDeProducto, cantidad)

    actualizarTotal();
        
}

function doClickEliminarElemento(e){
    $(this).parent().parent().remove();
    actualizarTotal();
}

function inicializar() {
    //Le dimos capacidades extras al select
    $("#slcComida").select2();

    $("#btnAgregarElemento").click(doClickAgregarElemento);
    $(".btnEliminarElemento").click(doClickEliminarElemento);
}

$(function () {
    inicializar();

});