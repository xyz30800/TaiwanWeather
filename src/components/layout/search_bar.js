import React, {Component}  from 'react';
import { Redirect } from 'react-router-dom';

import Autocomplete from 'components/layout/autocomplete';

import cityAllList from 'files/city.list.tw.json';

class SearchBar extends Component {

	constructor(props) {
		super(props);

		this.state = {
			cityAutoData: [],
			fireRedirect: false,
			town: '',
			city: ''
		}
	}

	componentWillMount() {
		document.querySelector('body').addEventListener('click', () => {
			document.querySelector('#autocomplete').style['display'] = 'none';
		})
	}

	showAutocomplete(e) {

		const searchText = e.target.value;
		const autocompleteEl = document.querySelector('#autocomplete');

		this.setState({ town: searchText, fireRedirect: false });
		// input 沒有文字不用顯示 auto
		if (searchText.length === 0) {
			autocompleteEl.style['display'] = 'none';
			this.setState({ cityAutoData: [] });
			return;
		}
		
		// 抓取與使用者輸入對應的資料 -> cityAutoData
		const cityAutoData = cityAllList
			.map(cities => {
				return {
					'name': cities.name, 'towns': cities.towns
				}
			})
			.map(city => {
				return city.towns
						.filter(town => town.name.includes(searchText))
						.map(town => {
							return {
								'city': city.name, 'town': town.name
							}
						})
			})
			.filter(city => city.length !== 0)
			.reduce((final, city) => {
				city.forEach(town => final.push(town))
	  			return final;
			}, [])
			.slice(0, 5);

		// 沒有對應資料，cityAutoData 設為空，相反則否
		if (cityAutoData.length === 0) {
			autocompleteEl.style['display'] = 'none';
			this.setState({ cityAutoData: [] });
		} else {
			autocompleteEl.style['display'] = 'inline-block';
			this.setState({ cityAutoData }, () =>{
				// 將 HTML array 轉為真正的 array
				const autocompleList = Array.apply(null, autocompleteEl.children[0].childNodes);
				// 將所有 auto 包含 active 使其, class of active 移除				
				autocompleList.forEach(item => item.classList.contains('active') && item.classList.remove('active'))
				// 將 autocomple 第一筆資料增加 class of active, 使其 highlight
				autocompleList[0].classList.add('active');
			});
		}
	}

	onKeyDown(e) {
		const els = Array.apply(null, document.querySelectorAll('#autocomplete ul li'));
		const elsLength = els.length;
		
		if (elsLength > 0) {
			// 找出有 active 的 index
			const activeOldIndex = els
				.map(item => item.classList.contains('active') ? true : false )
				.findIndex(item => item === true);

			const getKey = (pressKey, index, elsLength) => {

				const key = {
					ArrowDown: () => (index + 1 > elsLength - 1) ? 0 : (index += 1) ,
					ArrowUp: () => (index - 1 < 0) ? (elsLength - 1) : (index -= 1) ,
					other: () => NaN
				}
				return (key[pressKey] || key['other'])();
			}

			const activeNewIndex = getKey(e.key, activeOldIndex, elsLength);

			if (!isNaN(activeNewIndex)) {
				// 避免 input 的閃標因上下鍵而影響
				e.preventDefault();
				// 移除 auto 所有的 active
				els.forEach(item => item.classList.contains('active') && item.classList.remove('active'));
				// 經過上下移動到新的 auto，增加 active 
				els[activeNewIndex].classList.add('active');
				// re-render 新的 auto 上的鄉鎮 
				const {town, city} = els[activeNewIndex].dataset;
				this.setState({town, city});
			}
		} 
	}   

    onMouseOver(e) {
    	const els = Array.apply(null, document.querySelectorAll('.search-autocomplete ul li'));
		const elTarget = e.target;
		// 移除 auto 所有的 active
		els.forEach(item => item.classList.contains('active') && item.classList.remove('active'));
		// 滑鼠移動到新的 auto，增加 active 
    	(elTarget.localName === 'li') ? elTarget.classList.add('active') : elTarget.parentNode.classList.add('active');
    }

    onMouseOverBtn() { 
    	// 只要滑鼠移到 submit，fireRedirect 就轉為 false
    	this.setState({ fireRedirect: false })
    }

	selectText(e) {
		const elTarget = e.target;

		document.querySelector('#autocomplete').style['display'] = 'none';	
		// 找出目前被點擊到的項目是什麼 town 與 city
		const {town, city} = (elTarget.localName === 'li') ? elTarget.dataset : elTarget.parentNode.dataset;

		this.setState({ town, city, fireRedirect: false });
	}

	formSubmit(e) {
		e.preventDefault();
    	this.setState({ fireRedirect: true });
	}

	render() {
		return (
			<div className="public-container-search">
				<form onSubmit={e => this.formSubmit(e)}>
					<label htmlFor ="">輸入鄉市鎮: </label>
					<input type="text" name="town" onChange={e => this.showAutocomplete(e)} onKeyDown={e => this.onKeyDown(e)} value={this.state.town} required />
					<input type="hidden" name="city" />
					<button type="submit" onMouseOver={() => this.onMouseOverBtn()} >Search</button>
				</form>
				{
					this.state.fireRedirect && <Redirect push to={{
						pathname: '/result',
  						search: `?town=${this.state.town}&city=${this.state.city}`
					}}/>
				}
				<Autocomplete cityAutoData={this.state.cityAutoData} selectTextCB={e => this.selectText(e)} onMouseOverCB={e => this.onMouseOver(e)} />
			</div>
		)
	}
}

export default SearchBar;