(function(){
	// アイスクリーム一覧
	var icecreamModel = {
		list: [
			{id: 't1', name: 'バニラ'},
			{id: 't2', name: 'チョコレート'},
			{id: 't3', name: 'オレンジシャーベット'},
			{id: 't4', name: 'チョコミント'},
			{id: 't5', name: 'ストロベリー'},
			{id: 't6', name: '抹茶'}
		],

		// すべてのアイスクリームを返す(getter)
		getAll: function(){
			return this.list;
		},

		// IDで指定したアイスクリームオブジェクトを返す
		findById: function(id){
			return $.grep(this.list, function(val){
				return id == val.id;
			})[0];
		}
	};

	// 選択されているアイスクリームの管理
	var selectionModel = {
		// 選択されているアイスクリームが入る
		list: [],

		// アイスクリームの個数
		icecreamNumber: 2,

		// アイスクリームを追加する
		add: function(item){
			var list = this.list;
			list.push(item);
			if(list.length > this.icecreamNumber){
				// アイスクリーム制限個数以上の場合は
				list.shift(); // 0番目を捨てる
			}
			this.updateViews(); // ビューを更新
		},

		// 指定したアイスクリームが選択されていればtrueが返る
		contain: function(icecream){
			return this.list.indexOf(icecream) >= 0;
		},

		// IDで指定したアイスクリームが選択されていればtrueが返る
		containById: function(id){
			return this.contain(icecreamModel.findById(id));
		},

		// 選択されているアイスクリームを返す(getter)
		getIcecreams: function(){
			return this.list;
		},
		
		// ビューを更新する
		updateViews: function(){
			updateSelection();
			updateIcecreamList();
		}
	};

	// 簡単なテストチェック関数
	function ok(title, expect, value){
		if (expect == value) {
			console.log('OK : ' + title);
		} else {
			console.log('NG : ' + title + ' [' + expect + '] --> [' + value + ']');
		}
	}

	$(function(){
		var els = $('#icecreams');
		$.each(icecreamModel.getAll(),
			function(i, icecream){
				els.append(
					$('<li>')
						.append($('<input type="checkbox">'))
							.attr('name', icecream.id)
							.append($('<span>')
								.text(icecream.name))
						.click(function(){
						// ここでコントローラ呼び出し
					})
				);　// end of els.append
			} // end of function
		); // end of each
		selectionModel.updateViews();
	});

	// ビュー: チェックボックスを更新するビュー
	function updateSelection(){
		$('#icecreams input[type="checkbox"]').each(function(i, elm){
			elm.checked = selectionModel.containById(elm.name);
		});
	}

	// ビュー: 選択順序を更新するビュー
	function updateIcecreamList(){
		// 選択されたアイスクリーム一覧から
		// アイスクリーム名を集めて' > 'で連結して表示
		$('#icecream-list').text(
			$.map(selectionModel.getIcecreams(), function(val){
				return val.name;
			}).join(' > ')
		);
	}

	// テスト内容
	function testModels(){
		var all = icecreamModel.getAll();

		ok('icecreamModel:個数', all.length, 6);
		ok('icecreamModel.findById', icecreamModel.findById('t4'), all[3]);

		ok('selectionModel:最初の個数', selectionModel.getIcecreams().length, 0);
		ok('selectionModel.contain:空の場合', false, selectionModel.contain(all[0]));

		selectionModel.add(all[0]);
		ok('selectionModel:1つめを追加したときの個数', selectionModel.getIcecreams().length, 1);
		ok('selectionModel.contain:1つめを追加したときのチェック', true, selectionModel.contain(all[0]));

		selectionModel.add(all[1]);
		ok('selectionModel:2つめを追加したときの個数', selectionModel.getIcecreams().length, 2);
		ok('selectionModel.contain:2つめを追加したときのチェック', true, selectionModel.contain(all[1]));

		selectionModel.add(all[2]);
		ok('selectionModel:3つめを追加したときの個数', selectionModel.getIcecreams().length, 2);
		ok('selectionModel.contain:3つめを追加したときのチェック', true, selectionModel.contain(all[2]));
		ok('selectionModel.contain:3つめを追加したら最初のものは消える', false, selectionModel.contain(all[0]));
	}

	testModels(); //テスト実行
})();
