import React, { Component } from 'react';
import './stocks-table.css';

class MyStocksTable extends Component{

    constructor(props) {
        super(props)
    
        this.state = {
            isSelected : false  ,
            data : [],
            isCLicked : false
        }
        
    }
    componentDidMount(){
        if(this.state.isCLicked)
        this.stopTracking();
    }
    stopTracking = (event)=>{
       let index = 0
          // to find the button clicked
           index = this.props.items.findIndex( x => x.stockSymbol === event.target.value);
            this.setState({
                isCLicked:true
            })
            this.props.items.splice(index,1);
            this.props.stockRemoved(event.target.value);
    }
    render(){
        console.log(this.props.items);
        
        const isSelected = this.props.isSelected ;
        
        let showContent;
        if(isSelected && this.props.items.length>0){
           
           showContent= this.props.items.map(item =>{
                return( 
                        
                                <tr key={item.stockSymbol}>
                                    <td>{item.stockSymbol}</td>
                                    <td>{item.stockName}</td>
                                    <td>{item.shareCount}</td>
                                    <td>{item.buy_price}</td>
                                    <td>{item.currentPrice}</td>
                                    <td>{item.profitLoss}</td>
                                    <td><button type='button' className='StopTrackingBtn btn btn-danger btn-small' id="stopTrack" 
                                               value={item.stockSymbol}        onClick={this.stopTracking}>Stop Tracking</button></td>
                                </tr>
                         
                )
           })                 
        } 
        else{
            showContent = <tr className='text-center'><td colSpan='7'><strong>No Stocks have been selected</strong></td></tr> ;
        }

        return(
              
                 <tbody>{showContent}</tbody>                            
                
        );
    }
}

export default MyStocksTable;