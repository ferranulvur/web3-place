/* const Migrations = artifacts.require("Migrations");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
 */

const Matrix = artifacts.require("Matrix");

module.exports = function (deployer) {
  deployer.deploy(Matrix);
};