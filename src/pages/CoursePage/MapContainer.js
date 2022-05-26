import React, { useEffect, useState } from 'react'

const { kakao } = window

const MapContainer = ({ searchPlace, setIsMarkerClicked, setMarkerInfo }) => {

  // 검색결과 배열에 담아줌
  const [places, setPlaces] = useState([])
  
  useEffect(() => {
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 })
    var markers = []
    const container = document.getElementById('myMap')
    const options = {
      center: new kakao.maps.LatLng(33.375701, 126.570667),
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

      const renderPinContent = 
        '<div >' +
          '<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>' +
          '<div style="padding:5px;font-size:12px;">' + place.address_name + '</div>' +
          // '<button onClick={alert("test")}> test </button>' + 
        '</div>';

      kakao.maps.event.addListener(marker, 'click', function () {
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

  return (
    <div>
      <div
        id="myMap"
        style={{
          // width: '700px',
          height: '500px',
        }}
      ></div>
      <div id="result-list" style={{overflowY: "scroll", height: "30vh"}}>
        {places.map((item, i) => (
          <div key={i} style={{ marginTop: '20px' }}>
            <span>{i + 1}</span>
            <div>
              <h5>{item.place_name}</h5>
              {item.road_address_name ? (
                <div>
                  <span>{item.road_address_name}</span>
                  <span>{item.address_name}</span>
                </div>
              ) : (
                <span>{item.address_name}</span>
              )}
              <span>{item.phone}</span>
            </div>
          </div>
        ))}
        <div id="pagination"></div>
      </div>
    </div>
  )
}

export default MapContainer