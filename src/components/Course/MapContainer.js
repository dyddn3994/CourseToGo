import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import styled, { css } from 'styled-components';
import MapResultList from './MapResultList';
import CITY from '../../assets/City/City';
import MarkerImg from '../../assets/premium-icon-location-5582962.png';

const { kakao } = window

const MapContainer = forwardRef((props, ref) => {

  const { overSearchList, isOpenSearchList,searchPlace, setIsMarkerClicked, setMarkerInfo, thisCourseCity, isMouseOverMapList, setIsMouseOverMapList } = props;
  const [thisCity, setThisCity] = useState(thisCourseCity);
  const [temp, setTemp] = useState([]); // 테스트용 임시
  const [newPlaces , setNewPlaces] = useState([]);

  const [clickedSearchListPlace, setClickedSearchListPlace] = useState(''); // 선택된 검색리스트의 장소
  useImperativeHandle(ref, () => ({
    setMapCity(city) {
      setThisCity(city);
    }
  }));

  // 검색결과 배열에 담아줌
  const [places, setPlaces] = useState([])
  const [infowindow, setInfowindow] = useState(); // 마커에서 일정 등록 이후에 마커 클릭된 상태 닫으려고 한건데 안되네..
  
  let isMarkerContent = false;
  useEffect(() => {
    // var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 })
    setInfowindow(new kakao.maps.InfoWindow({ zIndex: 1 }))
    var markers = []
    const container = document.getElementById('myMap')
    // setContainer(document.getElementById('myMap'))

    if (thisCity === '') {
      setThisCity('Jeju')
    }
    const lat = CITY.find(item => item.value === thisCity).lat;
    const lng = CITY.find(item => item.value === thisCity).lng;
   
    const options = {
      center: new kakao.maps.LatLng(lat, lng),
      level: 10,
    }

    const map = new kakao.maps.Map(container, options)
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(searchPlace, placesSearchCB)
    
    var  imageSize = new kakao.maps.Size(40, 40), // 마커이미지의 크기입니다
    imageOption = { offset: new kakao.maps.Point(19, 43) };
    var markerImage = new kakao.maps.MarkerImage(MarkerImg, imageSize, imageOption)

    if(clickedSearchListPlace!==''){
      var locPosition = new kakao.maps.LatLng(clickedSearchListPlace.y, clickedSearchListPlace.x), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
          message = '<div style="padding:5px; background-color:#4D9FE3; color:#ffffff; font-size:1rem;">'
          +clickedSearchListPlace.place_name+'</div>'; // 인포윈도우에 표시될 내용입니다

      displayMyMarker(locPosition, message);
    }

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds()
        
        setPlaces(data);
        setTemp(data);

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i])
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
        }
        map.setBounds(bounds)
      }
    }

    function displayMarker(place) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      })
      kakao.maps.event.addListener(marker, 'click', function () {
        console.log('new list', newPlaces);
          isMarkerContent = !isMarkerContent; 
          let renderPinContent = 
            '<div style="padding-bottom: 20px;  border-radius:1rem; ">' +
            '<div style="padding:5px;font-size:1rem;">' + '이름: ' +  place.place_name + '</div>' +
            '<div style="padding:5px;font-size:1rem;">' + '주소: ' +  place.address_name + '</div>';
            for (let i = 0; i < newPlaces.length; i++) {
              if ((newPlaces[i].address_name === place.address_name) && (newPlaces[i].touristSpotAvgCost!==undefined) &&(newPlaces[i].touristSpotAvgTime!==undefined) ) {   
                renderPinContent = renderPinContent + 
                    '<div style="padding:5px;font-size:1rem;">' + '평균 비용: ' + newPlaces[i].touristSpotAvgCost + '원' + '</div>' +
                    '<div style="padding:5px;font-size:1rem;">' + '평균 소요시간: ' + newPlaces[i].touristSpotAvgTime/60 + '분' + '</div>';
                break;
              }
            }
        renderPinContent = renderPinContent + '</div>';
        infowindow.setContent(
          renderPinContent
        )
        if (isMarkerContent) {
          infowindow.open(map, marker)
          setIsMarkerClicked(true);
          setMarkerInfo(place)
        }
        else {
          infowindow.close()
          setIsMarkerClicked(false);
        }
      })

      kakao.maps.event.addListener(marker, 'mouseover', function() {
        let renderPinContent = 
        '<div style="padding-bottom: 10px;  border-radius:1rem;">' +
        '<div style="padding:5px;font-size:1rem;">' +  place.place_name + '</div>';
        infowindow.setContent(
          renderPinContent
        )  
          infowindow.open(map, marker)
      });
      
      kakao.maps.event.addListener(marker, 'mouseout', function() {
        infowindow.close();
      });
    }

     //-------- 마커 생성 -------------------//
    // 지도에 마커와 인포윈도우를 표시하는 함수입니다
    function displayMyMarker(locPosition, message) { // 함수 이름을 구분해줬다, 이래야 마크가 겹치지 않아서 버그가 생기지 않는다, 관련 호출이름도 다 바꿔 줘야한다.

            // 마커를 생성합니다
            var marker = new kakao.maps.Marker({
              map: map,
              position: locPosition,
               image: markerImage,
              zIndex:3
          });
  
          var iwContent = message; // 인포윈도우에 표시할 내용
  
          // 인포윈도우를 생성합니다
          var infowindow = new kakao.maps.InfoWindow({
              content: iwContent
          });
  
          kakao.maps.event.addListener(marker, 'click', function () {      
            marker.setMap(null);
            infowindow.close();
        })

          // 인포윈도우를 마커위에 표시합니다
          infowindow.open(map, marker);
  
          // 지도 중심좌표를 접속위치로 변경합니다
          map.setCenter(locPosition);
  }

  }, [clickedSearchListPlace, searchPlace])

  useEffect(() => {
    setAvgDatas();
  }, [temp, searchPlace])

  const setAvgDatas = async () => {
    let newDatas = [];
    places.map((item)=>{
      commuteGetMarkerInfo(item,newDatas);
    })
    setNewPlaces(newDatas);
    return newPlaces;
  }

  // 통신
  const commuteGetMarkerInfo = async (data, newDatas) => {
    // 마커 클릭했을때 보여질 정보 중 평균 수치들 출력
    await fetch("/course/spot?address="+data.address_name+"&name="+data.place_name+"&coordinateX="+data.x+"&coordinateY="+data.y)
    .then(res => {
      return res.json();
    })
    .then((touristSpotInfo) => {
      places.map((place) => {
        if (place.address_name === data.address_name) {
          newDatas.push({ ...data, touristSpotAvgCost: touristSpotInfo.touristSpotAvgCost, touristSpotAvgTime: touristSpotInfo.touristSpotAvgTime });
        }
      
        return newDatas;
      });
    })
  }

  return(
    <div>
    <div
      id="myMap"
      style={{
        // width: '700px',
        height: '690px',
      }}
    ></div>
     
      {/* <MapResultList places={places} isOpenSearchList={isOpenSearchList}  onMouseOverList={ onMouseOverList}  overSearchList={overSearchList}/> */}
   { (isOpenSearchList || isMouseOverMapList) ? (
      // <ResultList onMouseOver={() => setIsMouseOverMapList(true)} onMouseOut={() => setIsMouseOverMapList(false)}>
     
     <ResultList>
        { newPlaces.map((item, i) => (
          <div key={i}>
            <TextBox onClick={(e)=>  setClickedSearchListPlace(item)}>
              <div style={{fontWeight:'900',marginBottom:'3%' , fontSize:'1.1rem'}}>{item.place_name}</div>
              <div>주소: {item.address_name}</div>
              <div>전화번호: {item.phone}</div>
              {(item.touristSpotAvgTime===undefined)&&(item.touristSpotAvgCost===undefined) ? null:
                <div>
                    <div>평균시간: {item.touristSpotAvgTime} 분</div>
                    <div>평균비용: {item.touristSpotAvgCost} 원</div>
                </div>
              }
            </TextBox>
          </div>
        ))}

      </ResultList>
   ): null
   }
    </div>
  )
});

const ResultList = styled.div`
  overflow-y: scroll;
  height: 70%;
  background-color: #ffffff;
  opacity: 0.9;
  width:360px;
  position: fixed;
  margin-left:0.1%;
  top: 120px;
  padding: 5px;
  z-index:1;
  border-radius:1rem;
  margin-top:2%;
  box-shadow: 0px 0px 3px gray;
  &::-webkit-scrollbar {
    width:12px;
    border-radius:3%;
  }
  &::-webkit-scrollbar-thumb {
    background-color: lightgray ;
    border-radius:6px;
    background-clip: padding-box;
    border: 1px solid transparent;
  }
  &::-webkit-scrollbar-corner{
    background-color:#F5F5F5 ;
  }
  `;
  const TextBox = styled.div`
  // border-bottom: 1.5px solid  #4D9FE3;
  margin:2%;
  padding:5%;
  font-size:1rem;
  border-radius:1rem;
  &:hover{  
    background-color:lightgray ;
  }
  `;
export default MapContainer;