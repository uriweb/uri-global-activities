<?php
/*
Plugin Name: URI Global Activities Map
Plugin URI: http://www.uri.edu
Description: Display Global Activities Map
Version: 0.2
Author: John Pennypacker
Author URI: 
*/

// Block direct requests
if ( !defined('ABSPATH') )
	die('-1');
	
	
/**
 * 
 */
function uri_global_activities_shortcode($attributes, $content, $shortcode) {
    // normalize attribute keys, lowercase
    $attributes = array_change_key_case((array)$attributes, CASE_LOWER);
 
    // override default attributes with user attributes
    $attributes = shortcode_atts(array(
			//'uri2017-urls' => NULL
    ), $attributes, $shortcode);


		$args = array(
			'before_widget' => '<div class="widget %s">', 
			'after_widget' => '</div>',
			'before_title' => '<h2 class="widget-title">',
			'after_title' => '</h2>'
		);
			
		echo '
			<style>
				#map {
					height: 600px;
					margin-bottom: 2rem;
				}
				.leaflet-popup-content {
					font-family: \'Merriweather\', serif;
					font-size: 1rem;
				}
				.leaflet-popup-content .name {
					font-weight: 700;
				}
				.leaflet-popup-content .position {
					font-style: italic;
				}
				.leaflet-popup-content h6, 
				.leaflet-popup-content .name, 
				.leaflet-popup-content .position,
				.leaflet-popup-content .country {
					font-family: \'Source Sans Pro\', sans-serif;
				}
				.leaflet-popup-content .description {
					display: block;
					font-size: .875em;
					margin-top: 1em;
				}
				.leaflet-container a {
					border: 0 !important;
					box-shadow: none !important;
					background-color: inherit;
				}
				.leaflet-container h6 {
					font-weight: 700;
					margin: 0;
				}
			</style>
			<link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.2/dist/leaflet.css" />
			<script src="https://unpkg.com/leaflet@1.0.2/dist/leaflet.js"></script>
			<script src="' . plugins_url() . '/uri-global-activities/global-activities.js"></script>
			<div id="map"></div>
		';
		
}
add_shortcode( 'uri-global-activities-map', 'uri_global_activities_shortcode' );