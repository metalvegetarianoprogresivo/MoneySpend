        var html5rocks = {};
  			html5rocks.webdb = {};

  			html5rocks.webdb.db = null;

  			html5rocks.webdb.open = function() {
  				var dbSize = 5 * 1024 * 1024; // Son 5MB, obvio.
  				html5rocks.webdb.db = openDatabase("cash", "1.0", "Cash Manager", dbSize);
  			}

  			html5rocks.webdb.onError = function(tx, e) {
  				alert("Ocurrio un error: " + e.message);
  			}

  			html5rocks.webdb.onSuccess = function(tx, r) {
  				html5rocks.webdb.getAllItems();
  			}

  			html5rocks.webdb.createTable = function() {
  				var db = html5rocks.webdb.db;
  				db.transaction(function(tx) {
  					tx.executeSql("CREATE TABLE IF NOT EXISTS cash (id INTEGER PRIMARY KEY ASC, usuario VARCHAR(50), total LONG)", []);
  					tx.executeSql("CREATE TABLE IF NOT EXISTS tipos (id INTEGER PRIMARY KEY ASC, descripcion VARCHAR(50))", []);
  					tx.executeSql("CREATE TABLE IF NOT EXISTS salidas (id INTEGER PRIMARY KEY ASC, tipo INTEGER, monto LONG, fecha TEXT)", []);
  					tx.executeSql("CREATE TABLE IF NOT EXISTS entradas (id INTEGER PRIMARY KEY ASC, tipo INTEGER, monto LONG, fecha TEXT)", []);
            tx.executeSql("INSERT INTO cash (id, usuario, total) VALUES (1, 'Unknow', 12.50)", []);
            tx.executeSql("INSERT INTO tipos (id, descripcion) VALUES (1, 'Comida')", []);
            tx.executeSql("INSERT INTO tipos (id, descripcion) VALUES (2, 'Transporte')", []);
            tx.executeSql("INSERT INTO tipos (id, descripcion) VALUES (3, 'Bebida')", []);
            tx.executeSql("INSERT INTO tipos (id, descripcion) VALUES (4, 'Materiales')", []);
  					tx.executeSql("INSERT INTO tipos (id, descripcion) VALUES (5, 'Ocio')", []);
  				});
  			}

  			html5rocks.webdb.addSalidas = function(monto) {
  				var db = html5rocks.webdb.db;
  				db.transaction(function(tx){
  					var fecha = new Date();
  					var textFecha = fecha.getDate() + " de " + getMonthText(fecha.getMonth()) + " de " + fecha.getFullYear();
  					tx.executeSql("INSERT INTO salidas (tipo, monto, fecha) VALUES (?, ?, '?')", 
              [1, monto, textFecha], 
              html5rocks.webdb.onSuccess, 
              html5rocks.webdb.onError);
  				});
  			}

        html5rocks.webdb.getAllItems = function() {
          var db = html5rocks.webdb.db;
          db.transaction(function(tx) {
            tx.executeSql("SELECT * FROM cash LIMIT 1", [], loadItems, html5rocks.webdb.onError);
          });
        }

        function loadItems(tx, rs) {
          var Items = document.getElementById("items");
          Items.innerHTML = '<h4>Nombre: </h4><h3>' + rs.rows.item(0).usuario + '</h3><h4>Dinero: </h4><h1>' + rs.rows.item(0).total + '</h1>';

        }

        function init() {
          html5rocks.webdb.open();
          html5rocks.webdb.createTable();
          html5rocks.webdb.getAllItems();
        }

  			function getMonthText(n){
  				var textomes = new Array(12);
  				textomes[0] = "Enero";
  				textomes[1] = "Febrero";
  				textomes[2] = "Marzo";
  				textomes[3] = "Abril";
  				textomes[4] = "Mayo";
  				textomes[5] = "Junio";
  				textomes[6] = "Julio";
  				textomes[7] = "Agosto";
  				textomes[8] = "Septiembre";
  				textomes[9] = "Octubre";
  				textomes[10] = "Noviembre";
  				textomes[11] = "Diciembre";
  				return textomes[n];
  			}