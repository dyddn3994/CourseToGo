import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import styled, { css } from 'styled-components';
import MapResultList from './MapResultList';

const { kakao } = window

const CITYLATLNG = [
  { city: 'seoul', lat: 37.56667, lng: 126.97806 },
  { city: 'busan', lat: 35.17944, lng: 129.07556 },
  { city: 'daegu', lat: 35.87222, lng: 128.60250 },
  { city: 'incheon', lat: 37.45639, lng: 126.70528 },
  { city: 'gwangju', lat: 35.15972, lng: 126.85306 },
  { city: 'daejeon', lat: 36.35111, lng: 127.38500 },
  { city: 'ulsan', lat: 35.53889, lng: 129.31667 },
  { city: 'sejong', lat: 36.48750, lng: 127.28167 },
  { city: 'jeju', lat: 33.375701, lng: 126.570667 }
]

const MapContainer = forwardRef((props, ref) => {

  const { isOpenSearchList,searchPlace, setIsMarkerClicked, setMarkerInfo } = props;
  const [thisCity, setThisCity] = useState('제주');
  const [touristSpotInfo, setTouristSpotInfo] = useState({touristSpotAvgCost: 12, touristSpotAvgTime: 60});
  
  // 부모 컴포넌트에서 자식 함수 실행할 수 있도록 설정
  useImperativeHandle(ref, () => ({
    // 그룹 정보 조회
    setMarkerClose() {
      infowindow.close();
    }
  }));

  // 검색결과 배열에 담아줌
  const [places, setPlaces] = useState([])
  const [infowindow, setInfowindow] = useState(); // 마커에서 일정 등록 이후에 마커 클릭된 상태 닫으려고 한건데 안되네..
  
  useEffect(() => {
    setInfowindow(new kakao.maps.InfoWindow({ zIndex: 1 }))
    // var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 })
    var markers = []
    const container = document.getElementById('myMap')
    const lat = CITYLATLNG.find(item => item.city === 'busan').lat;
    const lng = CITYLATLNG.find(item => item.city === 'busan').lng;
    const options = {
      center: new kakao.maps.LatLng(lat, lng),
      level: 10,
    }
    const map = new kakao.maps.Map(container, options)

    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(searchPlace, placesSearchCB)

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds()

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i])
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
        }

        map.setBounds(bounds)
        // 페이지 목록 보여주는 displayPagination() 추가
        displayPagination(pagination)
        setPlaces(data)
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
        el.innerHTML = i

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

    let isMarkerContent = false;
    function displayMarker(place) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      })

      let renderPinContent = 
        '<div style="padding-bottom: 20px;">' +
          '<div style="padding:5px;font-size:12px;">' + '이름: ' + place.place_name + '</div>' +
          '<div style="padding:5px;font-size:12px;">' + '주소: ' + place.address_name + '</div>';
      if (Object.keys(touristSpotInfo).length !== 0) {
        renderPinContent = renderPinContent + 
          '<div style="padding:5px;font-size:12px;">' + '평균 비용: ' + touristSpotInfo.touristSpotAvgCost + '원' + '</div>' +
          '<div style="padding:5px;font-size:12px;">' + '평균 소요시간: ' + touristSpotInfo.touristSpotAvgTime + '시간' + '</div>';
      }
      renderPinContent = renderPinContent + '</div>';

      kakao.maps.event.addListener(marker, 'click', function () {
        commuteGetMarkerInfo();
        isMarkerContent = !isMarkerContent;
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

  // 통신
  const commuteGetMarkerInfo = (address, name) => {
    // 마커 클릭했을때 보여질 정보 중 평균 수치들 출력
    fetch("/course/spot?address="+address+"&name="+name)
    .then(res => {
      return res.json();
    })
    .then((touristSpotInfo) => {
      setTouristSpotInfo(touristSpotInfo);
    })
  }

  return (
    <div>
      <div
        id="myMap"
        style={{
           width: '100%',
          height: '450px',
          zIndex:'0'
        }}
      ></div>
      <MapResultList places={places} isOpenSearchList={isOpenSearchList} />
    </div>
  )
});

export default MapContainer