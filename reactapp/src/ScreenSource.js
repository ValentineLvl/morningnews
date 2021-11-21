import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import './App.css';
import { List, Avatar} from 'antd';
import Nav from './Nav';
import {connect} from 'react-redux';


function ScreenSource(props) {

  const [sourceList, setSourceList] = useState([])
  const [language, setLanguage] = useState("fr")

  useEffect(() => {
    const APIResultsLoading = async() => {
      var country = "fr"
      if(language == "en"){
        country = "gb"
      }
      const data = await fetch(`https://newsapi.org/v2/sources?language=${language}&country=${country}&apiKey=237109ba370f4c978972c9d2dcb6fdcf`)
      const body = await data.json()
      setSourceList(body.sources)
    }

    APIResultsLoading()
  }, [language])

  return (
    <div>
        <Nav/>
       
       <div className="Banner" style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
      
       <Avatar onClick={() => setLanguage("fr")} alt="news France" src="./images/france.png" style={{cursor:"pointer"}}/>
       <Avatar onClick={() => setLanguage("en")} alt="news UK" src="./images/uk.png" style={{cursor:"pointer"}}/>
       
       </div>

       <div className="HomeThemes">
          
              <List
                  itemLayout="horizontal"
                  dataSource={sourceList}
                  renderItem={source => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src={`/images/${source.category}.png`} />}
                        title={<Link to={`/screenarticlesbysource/${source.id}`}>{source.name}</Link>}
                        description={source.description}
                      />
                    </List.Item>
                  )}
                />


          </div>
                 
      </div>
  );
}

function mapStateToProps(state){
  return {userTokenDisplay: state.tokenUser}
}

export default connect(
  mapStateToProps,
  null
)(ScreenSource);
