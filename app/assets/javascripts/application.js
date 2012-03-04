// This is a manifest file that'll be compiled into including all the files listed below.
// Add new JavaScript/Coffee code in separate files in this directory and they'll automatically
// be included in the compiled file accessible from http://example.com/assets/application.js
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
//= require jquery
//= require jquery_ujs
//= require_tree .


function remove_fields(link, eleid) {
    remove_row(eleid);
    $(link).prev("input[type=hidden]").val("1");
    $(link).closest(".fields").hide();
}
// function for add lineitems in invoice
function add_fields(link, association, content) {
    var new_id = new Date().getTime();
    var regexp = new RegExp("new_" + association, "g")
    var new_content = change_html(content);
    $(link).parent().parent().before(new_content.replace(regexp, new_id));
}
// function for add lineitems in invoice
function add_fields(link, association, content) {
    var new_id = new Date().getTime();
    var regexp = new RegExp("new_" + association, "g")
    var new_content = change_html(content);
    $(link).parent().parent().before(new_content.replace(regexp, new_id));
}

//function for deduct total amount when remove link is clicked
function remove_row(element_id){
    var totalamount_id = '#toamount-' + element_id;
    var total_amount = $(totalamount_id).val();
    if (total_amount != "")
    {
        var invoicetotal = $("#invoicetotal").val();
        invoicetotal = parseFloat(invoicetotal) - parseFloat(total_amount);
        $("#invoicetotal").val(invoicetotal.toFixed(2));
    }
    else
    {
//return true;
}
}
// this function creates a new html for line items
// and puts dynamic id into this html
function change_html(incontent){
    var abc = incontent;
    var randid = Math.floor(Math.random()*999999);                              // only int-    /^ *[0-9]+ *$/        /prod-\d{0,}/
    var re_prod = new RegExp(/prod-\d{0,}/)
    var re_desc = new RegExp(/desc-\d{0,}/)
    var re_qnty = new RegExp(/qnty-\d{0,}/)
    var re_upri = new RegExp(/upri-\d{0,}/)
    var re_amount = new RegExp(/amount-\d{0,}/)
    var re_tax = new RegExp(/tax-\d{0,}/)
    var re_toamount = new RegExp(/toamount-\d{0,}/)
    var remove = new RegExp(/this,\d{0,}/)
    var newproductid = "prod-" + randid ;
    var newdescriptionid = "desc-" + randid ;
    var newquantityid = "qnty-" + randid ;
    var newunitpriceid = "upri-" + randid ;
    var newamountid = "amount-" + randid ;
    var newtaxid = "tax-" + randid ;
    var totalamountid = "toamount-" + randid ;
    var removefieldid = "this," + randid ;
    var newcontent = abc.replace(re_prod, newproductid );
    newcontent = newcontent.replace(re_desc, newdescriptionid );
    newcontent = newcontent.replace(re_qnty, newquantityid );
    newcontent = newcontent.replace(re_upri, newunitpriceid );
    newcontent = newcontent.replace(re_amount, newamountid );
    newcontent = newcontent.replace(re_tax, newtaxid );
    newcontent = newcontent.replace(re_toamount, totalamountid );
    newcontent = newcontent.replace(remove, removefieldid );
    return newcontent ;
}

$(document).ready(function() {
    

    // jquery for date picker in create invoice page
    $(function(){
        $("#datepicker2").live('click', function() {
            $(this).datepicker({
                dateFormat:  'yy-mm-dd',
                changeMonth: true,
                changeYear: true
            }).focus();
        });
    });
    // close............
    //validation for due date
    $(".new_invoice").submit(function() {
        if ($("#datepicker2").val() == ""){
            $("#vmessage").text("Please Select Due Date").show().fadeOut(4000);
            return false;
        }
        else{
            return true;
        }
    });
    $(".edit_invoice").submit(function() {
        if ($("#datepicker2").val() == ""){
            $("#vmessage").text("Please Select Due Date").show().fadeOut(4000);
            return false;
        }
        else{
            return true;
        }
    });
    // close...........
    // dynamic work for invoice
    // its works when change the selectbox for product
    $(".citem").live("change", function () {
        var abc = $(this).attr('id');
        var ids = abc.split("-");
        var id = ids[1];
        $.ajax({
            url: '/invoices/change?id='+$(this).val(),
            success: function(data){
                a = $.parseJSON(data);
                var description = '#desc-' + id;
                var unitprice = '#upri-' + id;
                var quantity = '#qnty-' + id;
                var amount = '#amount-' + id;
                var totalamount = '#toamount-' + id;
                if (a != null){
                    add_total(a.price, $(totalamount).val());
                    $(description).val(a.description);
                    $(unitprice).val((a.price).toFixed(2));
                    $(quantity).val(1);
                    $(amount).val((a.price).toFixed(2));
                    $(totalamount).val((a.price).toFixed(2));
                }
                else{
                    deduct_total($(totalamount).val());
                    $(description).val(null);
                    $(unitprice).val(null);
                    $(quantity).val(null);
                    $(amount).val(null);
                    $(totalamount).val(null);
                }
            }
        });
    });
    // close...........

    // it works when quantity changes for invoice lineitems
    $(".qntity").live("blur",function () {
        var abc = ($(this).attr('id'));
        var qty =($(this).val());
        var ids = abc.split("-");
        var finalid = ids[1];
        var desc = '#desc-' + finalid;
        var description = $(desc).val();
        var amount = '#amount-' + finalid;
        var totalamount = '#toamount-' + finalid;
        var untprcs = '#upri-' + finalid;
        var unitprice = $(untprcs).val();
        var re = new RegExp(/([1-9][0-9]*)/);
        if (description != ""){
            if (qty.match(re)){
                var old_value = $(totalamount).val();
                var new_value = (unitprice * qty).toFixed(2);
                $(amount).val((unitprice * qty).toFixed(2));
                $(totalamount).val((unitprice * qty).toFixed(2));
                add_for_qty(old_value, new_value);
            }
            else{
                $(this).val(null);
                alert ("Please Enter Desire Value For Quantity ");
                $(this).focus();
            }
        }
    });
    // close.................

    // function for get total amount for invoice
    // function for get total amount when select box changes from one product to another
    function add_total(amount, totalamount) {        
        var invoicetotal = $("#invoicetotal").val();
        alert(amount);
        alert(totalamount);
        if (totalamount != ""){
            invoicetotal = parseFloat(invoicetotal) + parseFloat(amount) - parseFloat(totalamount);
            $("#invoicetotal").val(invoicetotal.toFixed(2));
        }
        else{
            invoicetotal = parseFloat(invoicetotal) + parseFloat(amount) - 0.00 ;
            $("#invoicetotal").val(invoicetotal.toFixed(2));
        }
    }
    // function for get total amount when select box reset to "select a product" from a selected product
    function deduct_total(amount) {
        var invoicetotal = $("#invoicetotal").val();
        invoicetotal = parseFloat(invoicetotal) - parseFloat(amount);
        $("#invoicetotal").val(invoicetotal.toFixed(2));
    }
    // function for get total amount when quantity change for a product
    function add_for_qty(oldv, newv){
        var invoicetotal = $("#invoicetotal").val();
        invoicetotal = parseFloat(invoicetotal) + parseFloat(newv) - parseFloat(oldv);
        $("#invoicetotal").val(invoicetotal.toFixed(2));
    }

// close............
});


