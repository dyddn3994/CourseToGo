import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import styled, { css } from 'styled-components';
import MapResultList from './MapResultList';
import CITY from '../../assets/City/City';
const { kakao } = window



const MapContainer = forwardRef((props, ref) => {

  const { overSearchList, isOpenSearchList,searchPlace, setIsMarkerClicked, setMarkerInfo, thisCourseCity, isMouseOverMapList, setIsMouseOverMapList } = props;
  const [thisCity, setThisCity] = useState(thisCourseCity);
  const [touristSpotInfo, setTouristSpotInfo] = useState({});
  const [temp, setTemp] = useState([]); // 테스트용 임시
  
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
  // const [container, setContainer] = useState();
  // const [lat, setLat] = useState();
  // const [lng, setLng] = useState();
  // const [options, setOptions] = useState();
  // const [map, setMap] = useState();
  // const [ps, setPs] = useState();
  
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
    // setLat(CITY.find(item => item.value === thisCity).lat)
    const lng = CITY.find(item => item.value === thisCity).lng;
    // setLng(CITY.find(item => item.value === thisCity).lng)
    const options = {
      center: new kakao.maps.LatLng(lat, lng),
      level: 10,
    }
    // setOptions({
    //   center: new kakao.maps.LatLng(lat, lng),
    //   level: 10,
    // })
    const map = new kakao.maps.Map(container, options)
    // setMap(new kakao.maps.Map(container, options))

    const ps = new kakao.maps.services.Places();
    // setPs(new kakao.maps.services.Places())

    ps.keywordSearch(searchPlace, placesSearchCB)

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds()

        setPlaces(data)
        setTemp(data);

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i])
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
        }
        map.setBounds(bounds)

        // 페이지 목록 보여주는 displayPagination() 추가
        displayPagination(pagination)
      }
    }

    // 검색결과 목록 하단에 페이지 번호 표시
    function displayPagination(pagination) {
      var paginationEl = document.getElementById('pagination'),
        fragment = document.createDocumentFragment(),
        i

      // 기존에 추가된 페이지 번호 삭제
      while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild(paginationEl.lastChild)
      }

      for (i = 1; i <= pagination.last; i++) {
        var el = document.createElement('a')
        el.href = '#'
        el.innerHTML = '<span>'+i+'</span>'

        if (i === pagination.current) {
          el.className = 'on'
        } else {
          el.onclick = (function (i) {
            return function () {
              pagination.gotoPage(i)
            }
          })(i)
        }

        fragment.appendChild(el)
      }
      paginationEl.appendChild(fragment)
    }

    function displayMarker(place) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      })

      kakao.maps.event.addListener(marker, 'click', function () {
        isMarkerContent = !isMarkerContent;
        let renderPinContent = 
          '<div style="padding-bottom: 20px;">' +
            '<div style="padding:5px;font-size:12px;">' + '이름: ' + place.place_name + '</div>' +
            '<div style="padding:5px;font-size:12px;">' + '주소: ' + place.address_name + '</div>';
        // if (place.touristSpotAvgCost !== 0) {
        //   renderPinContent = renderPinContent + 
        //     '<div style="padding:5px;font-size:12px;">' + '평균 비용: ' + place.touristSpotAvgCost + '원' + '</div>' +
        //     '<div style="padding:5px;font-size:12px;">' + '평균 소요시간: ' + place.touristSpotAvgTime + '시간' + '</div>';
        // }
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

    }
  }, [searchPlace])

  useEffect(() => {
    setAvgDatas();
  }, [temp, searchPlace])

  const setAvgDatas = async () => {
    let newDatas = [];
    for await (const place of places) {
      await commuteGetMarkerInfo(place, newDatas)
    }
    setPlaces(newDatas);
  }

  // 통신
  const commuteGetMarkerInfo = async (data, newDatas) => {
    // 마커 클릭했을때 보여질 정보 중 평균 수치들 출력
    await fetch("/course/spot?address="+data.address_name+"&name="+data.place_name)
    .then(res => {
      return res.json();
    })
    .then((touristSpotInfo) => {
      const newPlaces = places.map((place) => {
        if (place.address_name === data.address_name) {
          newDatas.push({ ...place, touristSpotAvgCost: touristSpotInfo.touristSpotAvgCost, touristSpotAvgTime: touristSpotInfo.touristSpotAvgTime });
        }
        return (place.address_name === data.address_name 
        ? { ...place, touristSpotAvgCost: touristSpotInfo.touristSpotAvgCost, touristSpotAvgTime: touristSpotInfo.touristSpotAvgTime } 
        : place)});

    })
  }

  return (
    <div>
    <div
      id="myMap"
      style={{
        // width: '700px',
        height: '500px',
      }}
    ></div>
      {/* <div id="result-list" style={{
        overflowY: "scroll", 
        height: "25vh", 
        width: '40vh', 
        top: '-480px', 
        left: '20px', 
        zIndex: '3', 
        position: 'relative',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        scrollbarWidth: 'thin'
      }}>
        {places.map((item, i) => (
          <div key={i} style={{ marginBottom: '20px' }}>
            <div>
              <div style={{fontWeight: 'bold'}}>{item.place_name}</div>
              <span style={{marginTop: '-10px'}}>{item.address_name}</span>
              <span>{item.phone}</span>
            </div>
          </div>
        ))}
        <div id="pagination"></div>
      </div> */}
      {/* <MapResultList places={places} isOpenSearchList={isOpenSearchList}/> */}
   { (isOpenSearchList || isMouseOverMapList) ? (
      <ResultList onMouseOver={() => setIsMouseOverMapList(true)} onMouseOut={() => setIsMouseOverMapList(false)}>
        {places.map((item, i) => (
          <div key={i} onMouseOver={() => setIsMouseOverMapList(true)}>
            <TextBox onMouseOver={() => setIsMouseOverMapList(true)}>
              <div style={{fontWeight:'880', fontSize:'0.95rem',marginBottom:'3%'}}>{item.place_name}</div>
              <div>주소: {item.address_name}</div>
              <div>전화번호: {item.phone}</div>
              <div>평균시간: {item.touristSpotAvgTime}</div>
              <div>평균비용: {item.touristSpotAvgCost}</div>
            </TextBox>
          </div>
        ))}
        <div id="pagination"></div>
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
  width:280px;
  position: fixed;
  margin-left:0.1%;
  top: 100px;
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
  font-size:0.9rem;
  border-radius:1rem;
  &:hover{  
    background-color:lightgray ;
  }
  `;
export default MapContainer;