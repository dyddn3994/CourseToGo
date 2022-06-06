import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import styled, { css } from 'styled-components';
import MapResultList from './MapResultList';
import CITY from '../../assets/City/City';
const { kakao } = window

const ConfirmMapContainer = forwardRef((props, ref) => {

  const { overSearchList, isOpenSearchList, searchPlace, setIsMarkerClicked, setMarkerInfo, thisCourseCity, isMouseOverMapList, setIsMouseOverMapList,  itineraryArray } = props;
  const [thisCity, setThisCity] = useState(thisCourseCity);
  const [touristSpotInfo, setTouristSpotInfo] = useState({});
  const [temp, setTemp] = useState([]); // 테스트용 임시
  const [newPlaces , setNewPlaces] = useState([]);

  const [clickedSearchListPlace, setClickedSearchListPlace] = useState(''); // 선택된 검색리스트의 장소
  const [onClickedSearchList ,setOnClickedSearchList] =useState(false); // 검색 리스트 클릭 여부
  // const [map, setMap] = useState();
  // 부모 컴포넌트에서 자식 함수 실행할 수 있도록 설정
  useImperativeHandle(ref, () => ({
    // 그룹 정보 조회
    // setMarkerClose() {
    //   infowindow.close();
    // },
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

    if (thisCity === '') {
      setThisCity('Jeju')
    }
    const cityLat = CITY.find(item => item.value === thisCity).lat;
    const cityLng = CITY.find(item => item.value === thisCity).lng;

    // 화면 최초 렌더링할때 위치 잡기
    // 일정이 있을 경우 위경도 평균값으로, 없을 경우 코스에 설정된 도시로
    let options;
    const itineraryArrayNoCheck = itineraryArray.filter((itinerary) => itinerary.itineraryHidden !== true);

    if (itineraryArrayNoCheck.length === 0) {
      options = {
        center: new kakao.maps.LatLng(cityLat, cityLng),
        level: 11,
      }
    }
    else {
      var latSum = 0;
      var lngSum = 0;
      itineraryArrayNoCheck.map((itinerary) => {
        latSum += Number(itinerary.touristSpot.coordinateY)
        lngSum += Number(itinerary.touristSpot.coordinateX)
      });
      const latAvg = latSum / itineraryArrayNoCheck.length;
      const lngAvg = lngSum / itineraryArrayNoCheck.length;
      options = {
        center: new kakao.maps.LatLng(latAvg, lngAvg),
        level: 11,
      }
    }

    var map = new kakao.maps.Map(container, options)
    const ps = new kakao.maps.services.Places();


    // 마커 생성
    var markerPosition = []
    itineraryArrayNoCheck.map((itinerary) => {
      markerPosition.push({
          name: itinerary.touristSpot.touristSpotName,
          address: itinerary.touristSpot.touristSpotAddress,
          touristSpotAvgCost:itinerary.touristSpot.touristSpotAvgCost ,
          touristSpotAvgTime:itinerary.touristSpot.touristSpotAvgTime ,
          startTime:itinerary.itineraryStartTime ,
          endTime:itinerary.itineraryEndTime ,
          latlng: new kakao.maps.LatLng(itinerary.touristSpot.coordinateY, itinerary.touristSpot.coordinateX)
      })
    })
    
    for (var i = 0; i < markerPosition.length; i++) {
      displayMarker(markerPosition[i]);
    }

    // 선 그리기
    var markerPolyline = []
    itineraryArrayNoCheck.map((itinerary) => 
      markerPolyline.push(new kakao.maps.LatLng(itinerary.touristSpot.coordinateY, itinerary.touristSpot.coordinateX))
    )
    var markerLinePath = new kakao.maps.Polyline({
      map: map,
      path: markerPolyline, // 선을 구성하는 좌표배열 입니다
      strokeWeight: 3, // 선의 두께 입니다
      strokeColor: 'red', // 선의 색깔입니다
      strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      strokeStyle: 'solid' // 선의 스타일입니다
    });
    markerLinePath.setMap(map);



    function displayMarker(place) {
      let marker = new kakao.maps.Marker({
        map: map,
        position:place.latlng
      })
      kakao.maps.event.addListener(marker, 'click', function () {
    
        isMarkerContent = !isMarkerContent; 
        let renderPinContent = 
          '<div style="padding-bottom: 20px;  border-radius:1rem; ">' +
          '<div style="padding:5px;font-size:1rem;">' + '이름: ' +  place.name + '</div>' +
          '<div style="padding:5px;font-size:1rem;">' + '주소: ' +  place.address + '</div>'+
          '<div style="padding:5px;font-size:1rem;">' + '평균 비용: ' +place.touristSpotAvgCost + '원' + '</div>' +
          '<div style="padding:5px;font-size:1rem;">' + '평균 소요시간: ' + place.touristSpotAvgTime + '분' + '</div>';

        renderPinContent = renderPinContent + '</div>';
        var infowindow = new kakao.maps.InfoWindow({
          // 마커 클릭 시 출력될 정보
          content: renderPinContent,
          removable: true,
        })
        // if (isMarkerContent) {
          infowindow.open(map, marker)
        //   setIsMarkerClicked(true);
        //   setMarkerInfo(place)
        // }
        // else {
        //   infowindow.close()
        //   setIsMarkerClicked(false);
        // }
      })

      kakao.maps.event.addListener(marker, 'mouseover', function() {
        let renderPinContent = 
        '<div style="padding-bottom: 10px;  border-radius:1rem;">' +
        '<div style="padding:5px;font-size:1rem;">' +  place.name + '</div></div>';
        infowindow.setContent(
          renderPinContent
        )  
          infowindow.open(map, marker)
      });
      
      kakao.maps.event.addListener(marker, 'mouseout', function() {
        infowindow.close();
      });
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
    console.log('newPlaces list', newPlaces);
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
        console.log('newDatas list', newDatas);
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
    
    </div>
  )
});

export default ConfirmMapContainer;