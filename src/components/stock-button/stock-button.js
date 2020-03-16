import React, { Component } from 'react';
import axios from 'axios';
import './stock-button.css';

class StockButton extends Component{
    
    constructor(props) {
        super(props)
    
        this.state = {
            stock : null ,
            apiKey : "B2GITEYVXUDSZU15"
            
        }
        this.selectStock = this.selectStock.bind(this);
    }
    
    componentDidMount(){
        console.log("inside component did mount");
        this.getStockButtonNames();
       
    }
    
    getStockButtonNames = () =>{
            // fetch stock names from firebase database
         axios.get('https://finance-tracker-eb227.firebaseio.com/.json')
         .then(res => {
             
             this.setState({
                 stock:res.data,
                 currentPrice : 0 
                 
             })
             console.log(this.state.stock);
         })
    }

    selectStock = (event) =>{
        event.preventDefault();
      let  val = event.target.value;  //symbol is collected here
      let stockName = event.target.name; //stockname is taken here
       console.log(event.target);
 
       axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${val}&apikey=${this.state.apiKey}`)
       .then(res =>{
                let dailyData = res.data["Time Series (Daily)"];
                console.log(Object.values(dailyData)[0]);
                let  latestData = Object.values(dailyData)[0];
                console.log(latestData["4. close"]);
                console.log(res.data["Time Series (Daily)"]);
                this.setState({
                    currentPrice : latestData["4. close"]
                })
                this.props.currentPrice(val,stockName,this.state.currentPrice,true);
       })
    }

    render(){
        console.log(this.props.items);
        console.log(this.props.hidebuttonList);
        let hideButton = null;
        let showButton = null;
        let showStock =null;
        let showMessage = null;
        if(this.state.stock!==null){
          let stockValue = Object.values(this.state.stock);
          if(this.props.items.length<5 || this.props.hidebuttonList.length>0){
           showStock = stockValue.map(i=>{
               hideButton = this.props.items.some(item => item.stockSymbol === i.symbol); // to hide while adding stock
               showButton = this.props.hidebuttonList.some(item => item === i.symbol);
            
           
               if(!hideButton || showButton){  
                return <li key={i.symbol}>
                            <button type='button' id='stock-btn' name={i.name} className='StockButton btn btn-primary' onClick={this.selectStock} value={i.symbol}>{i.symbol}</button>
                               <span> <strong>{i.name}</strong></span></li>
              }  
              else
                return <li></li>
            
                
          })
         } 
         else{
             showMessage =<h3>You have selected 5 stocks, cannot add more <br/> Remove some stocks if you want to add a new stock </h3>;
        }
          
        }
        return(
            <div className='container'>
                <h3>Add stocks to my stocks</h3>
                <ul className='StockButton buttonList'>
                     {showStock}
                </ul>
                <div>{showMessage}</div>
            </div>
        );
    }
}

export default StockButton;







