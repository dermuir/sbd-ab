var ProductAll = React.createClass({ 

  getInitialState: function () {
    return { ProductName: '' ,ProductPrice: '',ProductID:'',Buttontxt:'Iniciar', Txt:'Guardar',data1: []};
  },
   handleChange: function(e) {
        this.setState({[e.target.name]: e.target.value});
        this.setState({[e.target.name]: e.target.value});
    },

  refresh() {
 
    $.ajax({
       url: "/api/products",
       type: "GET",
       dataType: 'json',
       ContentType: 'application/json',
       success: function(data) {     
        
         this.setState({data1: data}); 
         
       }.bind(this),
       error: function(jqXHR) {
         console.log(jqXHR);
           
       }.bind(this)
    });
  },
  
DeleteData(id){      
    $.ajax({
      url: "/api/products/"+id,
      dataType: 'json',
      type: 'DELETE',
      success: function(data) {
         this.refresh();

      }.bind(this),
      error: function(xhr, status, err) {
         alert(err); 
           
          
      }.bind(this),
      });
    },
 


    EditData(item){         
   this.setState({ProductName: item.ProductName,ProductPrice:item.ProductPrice,ProductID:item.ProductID,Buttontxt:'Editar'});
     },

   handleClick: function() {
 
   var Url="";
   var typex="POST";
   if(this.state.Buttontxt=="Guardar"){
      Url="/api/products";
       }
      else{ 
        if(this.state.Buttontxt=="Editar"){
        Url="/api/products/"+this.state.ProductID;
        typex="PUT";
        }else{
        Url="/api/products/login";
        typex = "POST";
        }
      }
      var productdata = {
        'ProductName': this.state.ProductName,
        'ProductPrice':this.state.ProductPrice,
        'ProductID':this.state.ProductID,
        
    }
    $.ajax({
      url: Url,
      dataType: 'json',
      type: typex,
      data: productdata,
      success: function(data) {               
        this.setState(this.getInitialState());
          if(this.state.Buttontxt == "Iniciar"){
            if(data.success == "true"){
              this.setState({Buttontxt:'Guardar'});
              this.refresh();
            }
          }else{
            this.refresh();
          }
          console.log(data.success);
      }.bind(this),
      error: function(xhr, status, err) {
         alert(err);     
      }.bind(this)
    });
  },

  render: function() {
    return ( 
      <div  className="container"  style={{marginTop:'50px'}}>{this.state.Buttontxt!="Iniciar"?
       <p className="text-center" style={{fontSize:'25px'}}><b> SBD ABC</b></p>:
        <p className="text-center" style={{fontSize:'25px'}}><b> Iniciar Sesion SBD</b></p>}
  <form>
    <div className="col-sm-12 col-md-12" style={{marginLeft:'400px'}}> 
  <table className="table-bordered">
     <tbody>
    <tr>
{this.state.Buttontxt!="Iniciar"?
      <td><b>Producto</b></td>:<td><b>Usuario</b></td>}
      <td>
         <input className="form-control" type="text" value={this.state.ProductName}    name="ProductName" onChange={ this.handleChange } />
          <input type="hidden" value={this.state.ProductID}    name="ProductID"  />
      </td>
    </tr>

{this.state.Buttontxt!="Iniciar"?
        <tr>
      <td><b>Precio</b></td>
      <td>
      <input type="text" className="form-control" value={this.state.ProductPrice}  name="ProductPrice" onChange={ this.handleChange } />
      </td>
</tr>:
    <tr><td><b>Password</b></td>
        <td>
      <input type="password" className="form-control" value={this.state.ProductPrice}  name="ProductPrice" onChange={ this.handleChange } />
      </td>
        </tr>
}
    <tr>
      <td></td>
      <td>
        <input className="btn btn-primary" type="button" value={this.state.Buttontxt} onClick={this.handleClick} />
      </td>
    </tr>

 </tbody>
    </table>
</div>
 {this.state.Buttontxt!="Iniciar"?
<div className="col-sm-12 col-md-12 "  style={{marginTop:'50px',backgroundColor: "#313131" ,marginLeft:'50px'}} >
 
 <table className="table"><tbody>
   <tr><th><b>Id</b></th><th><b>Precio</b></th><th><b>Nombre</b></th><th><b>Editar</b></th><th><b>Eliminar</b></th></tr>
    {this.state.data1.map((item, index) => (
        <tr key={index}>
           <td>{item.ProductID}</td> 
          <td>{item.ProductPrice}</td>                      
          <td>{item.ProductName}</td>
           <td> 
          
           <button type="button" className="btn btn-success" onClick={(e) => {this.EditData(item)}}>Editar</button>    
          </td> 
          <td> 
             <button type="button" className="btn btn-info" onClick={(e) => {this.DeleteData(item.ProductID)}}>Eliminar</button>
          </td> 
        </tr>
    ))}
    </tbody>
    </table>
     </div>
:<p></p>}
</form>        
      </div>
    );
  }
});

ReactDOM.render(<ProductAll  />, document.getElementById('root'))