import React, { Component } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Paper, Button } from '@material-ui/core';

class asteroidDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      asteroids: [],
    };
  }

  componentDidMount() {
    this.fetchAsteroidData();
  }

  fetchAsteroidData = async () => {
    const apiKey = 'dAWD1nfl2sESCdunL5Q4UiKTc9OqDAuSGRaVGbsj';
    const browseURL = `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${apiKey}`;

    try {
      const response = await fetch(browseURL);
      const data = await response.json();
      this.setState({ asteroids: data.near_earth_objects });
    } catch (error) {
      console.error('Error fetching asteroid data:', error);
    }
  };

  showAsteroidDetails = async (asteroidId) => {
    const apiKey = 'dAWD1nfl2sESCdunL5Q4UiKTc9OqDAuSGRaVGbsj';
    const detailsURL = `https://api.nasa.gov/neo/rest/v1/neo/${asteroidId}?api_key=${apiKey}`;

    try {
      const response = await fetch(detailsURL);
      const asteroidDetails = await response.json();

      const detailsWindow = window.open('', '_blank');
      detailsWindow.document.write(`<h2>${asteroidDetails.name} Details</h2>`);
      detailsWindow.document.write(`<p>ID: ${asteroidDetails.id}</p>`);
      detailsWindow.document.write(`<p>Name: ${asteroidDetails.name}</p>`);
      detailsWindow.document.write(`<p>Designation: ${asteroidDetails.designation}</p>`);
      detailsWindow.document.write(`<p>NASA JPL URL: <a href="${asteroidDetails.nasa_jpl_url}" target="_blank">${asteroidDetails.nasa_jpl_url}</a></p>`);
    } catch (error) {
      console.error('Error fetching asteroid details:', error);
    }
  };

  openRandomAsteroidDetails = () => {
    const randomIndex = Math.floor(Math.random() * this.state.asteroids.length);
    const randomAsteroidId = this.state.asteroids[randomIndex].id;
    this.showAsteroidDetails(randomAsteroidId);
  };

  render() {
    return (
      <div>
        <h1>Asteroid Information</h1>
        <Button variant="contained" onClick={this.openRandomAsteroidDetails}>
          Random Asteroid
        </Button>
        <Paper elevation={3}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Designation</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.asteroids.map((asteroid) => (
                <TableRow key={asteroid.id}>
                  <TableCell>{asteroid.id}</TableCell>
                  <TableCell>
                    <a onClick={() => this.showAsteroidDetails(asteroid.id)} style={{ cursor: 'pointer', color: 'blue' }}>
                      {asteroid.name}
                    </a>
                  </TableCell>
                  <TableCell>{asteroid.designation}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

export default asteroidDetails;
