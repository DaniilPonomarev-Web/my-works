'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">@web-clients-backend/source documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/ApimeIntegrationModule.html" data-type="entity-link" >ApimeIntegrationModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ApimeIntegrationModule-e60008c0fb91e9ba32e80a0e4ccd7ad5094d3f1500d14244aa6eb953fbd31f26a226e0f1a88fd41055d65cdcbdb0b16af1cd80312ace78585987d36efdd46481"' : 'data-bs-target="#xs-injectables-links-module-ApimeIntegrationModule-e60008c0fb91e9ba32e80a0e4ccd7ad5094d3f1500d14244aa6eb953fbd31f26a226e0f1a88fd41055d65cdcbdb0b16af1cd80312ace78585987d36efdd46481"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ApimeIntegrationModule-e60008c0fb91e9ba32e80a0e4ccd7ad5094d3f1500d14244aa6eb953fbd31f26a226e0f1a88fd41055d65cdcbdb0b16af1cd80312ace78585987d36efdd46481"' :
                                        'id="xs-injectables-links-module-ApimeIntegrationModule-e60008c0fb91e9ba32e80a0e4ccd7ad5094d3f1500d14244aa6eb953fbd31f26a226e0f1a88fd41055d65cdcbdb0b16af1cd80312ace78585987d36efdd46481"' }>
                                        <li class="link">
                                            <a href="injectables/ApimeIntegrationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ApimeIntegrationService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SearchApimeService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SearchApimeService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-0a6b6d50f4afc2e973a9684001f014e9727d5c70b160267e30cd003a344c4c501314f9669d34db6880425c4098cf5e37e68352cb90882f37237b38de21d85280"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-0a6b6d50f4afc2e973a9684001f014e9727d5c70b160267e30cd003a344c4c501314f9669d34db6880425c4098cf5e37e68352cb90882f37237b38de21d85280"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-0a6b6d50f4afc2e973a9684001f014e9727d5c70b160267e30cd003a344c4c501314f9669d34db6880425c4098cf5e37e68352cb90882f37237b38de21d85280"' :
                                        'id="xs-injectables-links-module-AuthModule-0a6b6d50f4afc2e973a9684001f014e9727d5c70b160267e30cd003a344c4c501314f9669d34db6880425c4098cf5e37e68352cb90882f37237b38de21d85280"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ClientModule.html" data-type="entity-link" >ClientModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ClientModule-7a2e09277359263183a909e8e81565af596db5b9c359609fde42730a04608606a3ae5d1f35dfb825a5464c21b2e7e61272c72b459bb4d789050541aae71c45a3"' : 'data-bs-target="#xs-injectables-links-module-ClientModule-7a2e09277359263183a909e8e81565af596db5b9c359609fde42730a04608606a3ae5d1f35dfb825a5464c21b2e7e61272c72b459bb4d789050541aae71c45a3"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ClientModule-7a2e09277359263183a909e8e81565af596db5b9c359609fde42730a04608606a3ae5d1f35dfb825a5464c21b2e7e61272c72b459bb4d789050541aae71c45a3"' :
                                        'id="xs-injectables-links-module-ClientModule-7a2e09277359263183a909e8e81565af596db5b9c359609fde42730a04608606a3ae5d1f35dfb825a5464c21b2e7e61272c72b459bb4d789050541aae71c45a3"' }>
                                        <li class="link">
                                            <a href="injectables/ClientService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ClientService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CoreModule.html" data-type="entity-link" >CoreModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CoreModule-8c631d8804dac7caa51a687752072affa11175ac21d829c29ca7c8fa3b64878d1672b8c324d40fad723b7e0009be0986b6b6641a65e2297b1405c969420e2be5"' : 'data-bs-target="#xs-controllers-links-module-CoreModule-8c631d8804dac7caa51a687752072affa11175ac21d829c29ca7c8fa3b64878d1672b8c324d40fad723b7e0009be0986b6b6641a65e2297b1405c969420e2be5"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CoreModule-8c631d8804dac7caa51a687752072affa11175ac21d829c29ca7c8fa3b64878d1672b8c324d40fad723b7e0009be0986b6b6641a65e2297b1405c969420e2be5"' :
                                            'id="xs-controllers-links-module-CoreModule-8c631d8804dac7caa51a687752072affa11175ac21d829c29ca7c8fa3b64878d1672b8c324d40fad723b7e0009be0986b6b6641a65e2297b1405c969420e2be5"' }>
                                            <li class="link">
                                                <a href="controllers/UptimeController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UptimeController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DlModule.html" data-type="entity-link" >DlModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-DlModule-a5400aaec23231c1e6db5973d51aedbf33c4a0bc6ead9180d8794b54d28ef9df5bd768876db1a237ec53c93dddd51d49e2edcd65f8f69013ed323c9821d9cbb8"' : 'data-bs-target="#xs-injectables-links-module-DlModule-a5400aaec23231c1e6db5973d51aedbf33c4a0bc6ead9180d8794b54d28ef9df5bd768876db1a237ec53c93dddd51d49e2edcd65f8f69013ed323c9821d9cbb8"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DlModule-a5400aaec23231c1e6db5973d51aedbf33c4a0bc6ead9180d8794b54d28ef9df5bd768876db1a237ec53c93dddd51d49e2edcd65f8f69013ed323c9821d9cbb8"' :
                                        'id="xs-injectables-links-module-DlModule-a5400aaec23231c1e6db5973d51aedbf33c4a0bc6ead9180d8794b54d28ef9df5bd768876db1a237ec53c93dddd51d49e2edcd65f8f69013ed323c9821d9cbb8"' }>
                                        <li class="link">
                                            <a href="injectables/DLService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DLService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/GqlModule.html" data-type="entity-link" >GqlModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-GqlModule-d603696e6bfdc871c5bfb54ca94e6668ecc1c832a1c2bc090cdf74c07cb7947d7dd406fef151ea83e171b924f1d12a606de0d65504a2328b41bafa34947d177d"' : 'data-bs-target="#xs-controllers-links-module-GqlModule-d603696e6bfdc871c5bfb54ca94e6668ecc1c832a1c2bc090cdf74c07cb7947d7dd406fef151ea83e171b924f1d12a606de0d65504a2328b41bafa34947d177d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-GqlModule-d603696e6bfdc871c5bfb54ca94e6668ecc1c832a1c2bc090cdf74c07cb7947d7dd406fef151ea83e171b924f1d12a606de0d65504a2328b41bafa34947d177d"' :
                                            'id="xs-controllers-links-module-GqlModule-d603696e6bfdc871c5bfb54ca94e6668ecc1c832a1c2bc090cdf74c07cb7947d7dd406fef151ea83e171b924f1d12a606de0d65504a2328b41bafa34947d177d"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-GqlModule-d603696e6bfdc871c5bfb54ca94e6668ecc1c832a1c2bc090cdf74c07cb7947d7dd406fef151ea83e171b924f1d12a606de0d65504a2328b41bafa34947d177d"' : 'data-bs-target="#xs-injectables-links-module-GqlModule-d603696e6bfdc871c5bfb54ca94e6668ecc1c832a1c2bc090cdf74c07cb7947d7dd406fef151ea83e171b924f1d12a606de0d65504a2328b41bafa34947d177d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-GqlModule-d603696e6bfdc871c5bfb54ca94e6668ecc1c832a1c2bc090cdf74c07cb7947d7dd406fef151ea83e171b924f1d12a606de0d65504a2328b41bafa34947d177d"' :
                                        'id="xs-injectables-links-module-GqlModule-d603696e6bfdc871c5bfb54ca94e6668ecc1c832a1c2bc090cdf74c07cb7947d7dd406fef151ea83e171b924f1d12a606de0d65504a2328b41bafa34947d177d"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/JournalizatingModule.html" data-type="entity-link" >JournalizatingModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-JournalizatingModule-0a427fa8c3abe9d5b81d93d4548966eaf607d214ea1695d737b8264ddd5d662c41af883bfb9553b74da607a7da4acb90499d337d2b75108336804c9afd1cc3ee"' : 'data-bs-target="#xs-injectables-links-module-JournalizatingModule-0a427fa8c3abe9d5b81d93d4548966eaf607d214ea1695d737b8264ddd5d662c41af883bfb9553b74da607a7da4acb90499d337d2b75108336804c9afd1cc3ee"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-JournalizatingModule-0a427fa8c3abe9d5b81d93d4548966eaf607d214ea1695d737b8264ddd5d662c41af883bfb9553b74da607a7da4acb90499d337d2b75108336804c9afd1cc3ee"' :
                                        'id="xs-injectables-links-module-JournalizatingModule-0a427fa8c3abe9d5b81d93d4548966eaf607d214ea1695d737b8264ddd5d662c41af883bfb9553b74da607a7da4acb90499d337d2b75108336804c9afd1cc3ee"' }>
                                        <li class="link">
                                            <a href="injectables/JournalizatingService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JournalizatingService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/JournalizationModule.html" data-type="entity-link" >JournalizationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-JournalizationModule-5b0dba2b18077ed01ed4e05e8ecf38b2d8375185b0c2ab1b7c2815c625e9980a4cfef542f77d81be4ae5901546e3d7021486a45d3ed99220d58b470309b1b2ab"' : 'data-bs-target="#xs-controllers-links-module-JournalizationModule-5b0dba2b18077ed01ed4e05e8ecf38b2d8375185b0c2ab1b7c2815c625e9980a4cfef542f77d81be4ae5901546e3d7021486a45d3ed99220d58b470309b1b2ab"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-JournalizationModule-5b0dba2b18077ed01ed4e05e8ecf38b2d8375185b0c2ab1b7c2815c625e9980a4cfef542f77d81be4ae5901546e3d7021486a45d3ed99220d58b470309b1b2ab"' :
                                            'id="xs-controllers-links-module-JournalizationModule-5b0dba2b18077ed01ed4e05e8ecf38b2d8375185b0c2ab1b7c2815c625e9980a4cfef542f77d81be4ae5901546e3d7021486a45d3ed99220d58b470309b1b2ab"' }>
                                            <li class="link">
                                                <a href="controllers/JournalizationController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JournalizationController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/KeycloakIntegrationModule.html" data-type="entity-link" >KeycloakIntegrationModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-KeycloakIntegrationModule-a43e5025b0749618c7cf4707f60ce8773a779b6053253cd59d6ce5bce49304cb9e24fde6e53494d4615049a889053ce5cde7336f703e01419ab821dda44aa34f"' : 'data-bs-target="#xs-injectables-links-module-KeycloakIntegrationModule-a43e5025b0749618c7cf4707f60ce8773a779b6053253cd59d6ce5bce49304cb9e24fde6e53494d4615049a889053ce5cde7336f703e01419ab821dda44aa34f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-KeycloakIntegrationModule-a43e5025b0749618c7cf4707f60ce8773a779b6053253cd59d6ce5bce49304cb9e24fde6e53494d4615049a889053ce5cde7336f703e01419ab821dda44aa34f"' :
                                        'id="xs-injectables-links-module-KeycloakIntegrationModule-a43e5025b0749618c7cf4707f60ce8773a779b6053253cd59d6ce5bce49304cb9e24fde6e53494d4615049a889053ce5cde7336f703e01419ab821dda44aa34f"' }>
                                        <li class="link">
                                            <a href="injectables/KeycloakIntegrationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >KeycloakIntegrationService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/KeycloakModule.html" data-type="entity-link" >KeycloakModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-KeycloakModule-190821f35dcc98cdf7cc22a515dd106831afb94261f51f2ed4f0905f94e8e00987ee69262e11d3873dec89c56d6ea13415106c649d2fb385ce9e713fce220f25"' : 'data-bs-target="#xs-injectables-links-module-KeycloakModule-190821f35dcc98cdf7cc22a515dd106831afb94261f51f2ed4f0905f94e8e00987ee69262e11d3873dec89c56d6ea13415106c649d2fb385ce9e713fce220f25"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-KeycloakModule-190821f35dcc98cdf7cc22a515dd106831afb94261f51f2ed4f0905f94e8e00987ee69262e11d3873dec89c56d6ea13415106c649d2fb385ce9e713fce220f25"' :
                                        'id="xs-injectables-links-module-KeycloakModule-190821f35dcc98cdf7cc22a515dd106831afb94261f51f2ed4f0905f94e8e00987ee69262e11d3873dec89c56d6ea13415106c649d2fb385ce9e713fce220f25"' }>
                                        <li class="link">
                                            <a href="injectables/KeycloakService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >KeycloakService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/LogsAndJournalsModule.html" data-type="entity-link" >LogsAndJournalsModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-LogsAndJournalsModule-b2922ac20e05dfefee96778bc39a4b03810c47a506e22cbe84b12a22c01123cf209b241a8d0d124286e3d77c1360016560cfe33388bf145293573a36289f8b5f"' : 'data-bs-target="#xs-injectables-links-module-LogsAndJournalsModule-b2922ac20e05dfefee96778bc39a4b03810c47a506e22cbe84b12a22c01123cf209b241a8d0d124286e3d77c1360016560cfe33388bf145293573a36289f8b5f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-LogsAndJournalsModule-b2922ac20e05dfefee96778bc39a4b03810c47a506e22cbe84b12a22c01123cf209b241a8d0d124286e3d77c1360016560cfe33388bf145293573a36289f8b5f"' :
                                        'id="xs-injectables-links-module-LogsAndJournalsModule-b2922ac20e05dfefee96778bc39a4b03810c47a506e22cbe84b12a22c01123cf209b241a8d0d124286e3d77c1360016560cfe33388bf145293573a36289f8b5f"' }>
                                        <li class="link">
                                            <a href="injectables/AppLoggerLoki.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppLoggerLoki</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LogsAndJournalsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LogsAndJournalsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PromModule.html" data-type="entity-link" >PromModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/RabbitModule.html" data-type="entity-link" >RabbitModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-RabbitModule-69d408c55bc298414d3b03d2c20a2bebbddcfcdb229667abf356a0278dd85f774c718c4bf02eaccb568b151082e6488fd633e4517291fd5eda4935df48fb8361"' : 'data-bs-target="#xs-injectables-links-module-RabbitModule-69d408c55bc298414d3b03d2c20a2bebbddcfcdb229667abf356a0278dd85f774c718c4bf02eaccb568b151082e6488fd633e4517291fd5eda4935df48fb8361"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RabbitModule-69d408c55bc298414d3b03d2c20a2bebbddcfcdb229667abf356a0278dd85f774c718c4bf02eaccb568b151082e6488fd633e4517291fd5eda4935df48fb8361"' :
                                        'id="xs-injectables-links-module-RabbitModule-69d408c55bc298414d3b03d2c20a2bebbddcfcdb229667abf356a0278dd85f774c718c4bf02eaccb568b151082e6488fd633e4517291fd5eda4935df48fb8361"' }>
                                        <li class="link">
                                            <a href="injectables/RabbitMQService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RabbitMQService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SearchService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SearchService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SearchClientsModule.html" data-type="entity-link" >SearchClientsModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-SearchClientsModule-c5f1bf61705aa684e83736abad4d2031962722ab1424705d9df38db5ce3f6ff8181d69b6070aac4c977bd3d5cf5cbf247240b4964f7035f0024fd50e787ad11d"' : 'data-bs-target="#xs-injectables-links-module-SearchClientsModule-c5f1bf61705aa684e83736abad4d2031962722ab1424705d9df38db5ce3f6ff8181d69b6070aac4c977bd3d5cf5cbf247240b4964f7035f0024fd50e787ad11d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SearchClientsModule-c5f1bf61705aa684e83736abad4d2031962722ab1424705d9df38db5ce3f6ff8181d69b6070aac4c977bd3d5cf5cbf247240b4964f7035f0024fd50e787ad11d"' :
                                        'id="xs-injectables-links-module-SearchClientsModule-c5f1bf61705aa684e83736abad4d2031962722ab1424705d9df38db5ce3f6ff8181d69b6070aac4c977bd3d5cf5cbf247240b4964f7035f0024fd50e787ad11d"' }>
                                        <li class="link">
                                            <a href="injectables/SearchAreasService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SearchAreasService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SearchClientsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SearchClientsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SearchUnlinkedMsisdnsModule.html" data-type="entity-link" >SearchUnlinkedMsisdnsModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-SearchUnlinkedMsisdnsModule-4ae1afb4fd3813a80badb26b7659f77ca314d65cff9ecf6edf38469eb217922a01478bb925c317c7f72df8384132b0022299e40162f8f858bdffe38c15754e9c"' : 'data-bs-target="#xs-injectables-links-module-SearchUnlinkedMsisdnsModule-4ae1afb4fd3813a80badb26b7659f77ca314d65cff9ecf6edf38469eb217922a01478bb925c317c7f72df8384132b0022299e40162f8f858bdffe38c15754e9c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SearchUnlinkedMsisdnsModule-4ae1afb4fd3813a80badb26b7659f77ca314d65cff9ecf6edf38469eb217922a01478bb925c317c7f72df8384132b0022299e40162f8f858bdffe38c15754e9c"' :
                                        'id="xs-injectables-links-module-SearchUnlinkedMsisdnsModule-4ae1afb4fd3813a80badb26b7659f77ca314d65cff9ecf6edf38469eb217922a01478bb925c317c7f72df8384132b0022299e40162f8f858bdffe38c15754e9c"' }>
                                        <li class="link">
                                            <a href="injectables/SearchUnlinkedMsisdnsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SearchUnlinkedMsisdnsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/KeycloakController.html" data-type="entity-link" >KeycloakController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Journal.html" data-type="entity-link" >Journal</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/BalanceClientSearchDTO.html" data-type="entity-link" >BalanceClientSearchDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/CategoryDto.html" data-type="entity-link" >CategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ClientDataDTO.html" data-type="entity-link" >ClientDataDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/ClientFilterInput.html" data-type="entity-link" >ClientFilterInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/ClientResolver.html" data-type="entity-link" >ClientResolver</a>
                            </li>
                            <li class="link">
                                <a href="classes/ClientsSearchedDTO.html" data-type="entity-link" >ClientsSearchedDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/ClientsSearchInputDTO.html" data-type="entity-link" >ClientsSearchInputDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/CoreResolver.html" data-type="entity-link" >CoreResolver</a>
                            </li>
                            <li class="link">
                                <a href="classes/DocumentClientSearchDTO.html" data-type="entity-link" >DocumentClientSearchDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/EquipmentClientSearchDTO.html" data-type="entity-link" >EquipmentClientSearchDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/ErrorFilter.html" data-type="entity-link" >ErrorFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetSearchAreasInputDTO.html" data-type="entity-link" >GetSearchAreasInputDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/Journal.html" data-type="entity-link" >Journal</a>
                            </li>
                            <li class="link">
                                <a href="classes/JournalDTO.html" data-type="entity-link" >JournalDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/JournalsDTO.html" data-type="entity-link" >JournalsDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/LogsAndJournalsResolver.html" data-type="entity-link" >LogsAndJournalsResolver</a>
                            </li>
                            <li class="link">
                                <a href="classes/MonetaryClientSearchDTO.html" data-type="entity-link" >MonetaryClientSearchDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/MsisdnDto.html" data-type="entity-link" >MsisdnDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/MsisdnFilterDTO.html" data-type="entity-link" >MsisdnFilterDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/NameClientSearchDTO.html" data-type="entity-link" >NameClientSearchDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaginationDTO.html" data-type="entity-link" >PaginationDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/PassportClientSearchDTO.html" data-type="entity-link" >PassportClientSearchDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegionDto.html" data-type="entity-link" >RegionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SearchAreasDTO.html" data-type="entity-link" >SearchAreasDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/SearchAreasResolver.html" data-type="entity-link" >SearchAreasResolver</a>
                            </li>
                            <li class="link">
                                <a href="classes/SearchAreaWithLabelDTO.html" data-type="entity-link" >SearchAreaWithLabelDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/SearchClientsResolver.html" data-type="entity-link" >SearchClientsResolver</a>
                            </li>
                            <li class="link">
                                <a href="classes/SearchUnlinkedMsisdnsDTO.html" data-type="entity-link" >SearchUnlinkedMsisdnsDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/SearchUnlinkedMsisdnsQueryDto.html" data-type="entity-link" >SearchUnlinkedMsisdnsQueryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SearchUnlinkedMsisdnsResolver.html" data-type="entity-link" >SearchUnlinkedMsisdnsResolver</a>
                            </li>
                            <li class="link">
                                <a href="classes/SearchUnlinkedMsisdnsResponseDto.html" data-type="entity-link" >SearchUnlinkedMsisdnsResponseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SortInput.html" data-type="entity-link" >SortInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/SortInputDTO.html" data-type="entity-link" >SortInputDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/StateDto.html" data-type="entity-link" >StateDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/StructuredNameClientSearchDTO.html" data-type="entity-link" >StructuredNameClientSearchDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/SubscriberClientSearchDTO.html" data-type="entity-link" >SubscriberClientSearchDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/UnlinkedMsisdnsDto.html" data-type="entity-link" >UnlinkedMsisdnsDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ApimeTokenInterceptor.html" data-type="entity-link" >ApimeTokenInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SearchApimeService.html" data-type="entity-link" >SearchApimeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SearchDictionaryService.html" data-type="entity-link" >SearchDictionaryService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/ApimeConnectionGuard.html" data-type="entity-link" >ApimeConnectionGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/KeycloakTokenGuard.html" data-type="entity-link" >KeycloakTokenGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Configuration.html" data-type="entity-link" >Configuration</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ConfigurationApiMe.html" data-type="entity-link" >ConfigurationApiMe</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ConfigurationBroker.html" data-type="entity-link" >ConfigurationBroker</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ConfigurationBrokerQueue.html" data-type="entity-link" >ConfigurationBrokerQueue</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ConfigurationKafka.html" data-type="entity-link" >ConfigurationKafka</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ConfigurationKeycloak.html" data-type="entity-link" >ConfigurationKeycloak</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ConfigurationPostgres.html" data-type="entity-link" >ConfigurationPostgres</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ConfigurationRedis.html" data-type="entity-link" >ConfigurationRedis</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HttpError.html" data-type="entity-link" >HttpError</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAccessTokenInput.html" data-type="entity-link" >IAccessTokenInput</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAddressType.html" data-type="entity-link" >IAddressType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAddressTypesResponse.html" data-type="entity-link" >IAddressTypesResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IApiMeHealth.html" data-type="entity-link" >IApiMeHealth</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IBalanceClient.html" data-type="entity-link" >IBalanceClient</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IBillingDeliveryType.html" data-type="entity-link" >IBillingDeliveryType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IBillingDeliveryTypesResponse.html" data-type="entity-link" >IBillingDeliveryTypesResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICategory.html" data-type="entity-link" >ICategory</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICityType.html" data-type="entity-link" >ICityType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICityTypesResponse.html" data-type="entity-link" >ICityTypesResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IClientApiResult.html" data-type="entity-link" >IClientApiResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IClientSearch.html" data-type="entity-link" >IClientSearch</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IClientSearchResult.html" data-type="entity-link" >IClientSearchResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IClientType.html" data-type="entity-link" >IClientType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IClientTypesResponse.html" data-type="entity-link" >IClientTypesResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IContactClient.html" data-type="entity-link" >IContactClient</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IContractClient.html" data-type="entity-link" >IContractClient</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICountryType.html" data-type="entity-link" >ICountryType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICountryTypesResponse.html" data-type="entity-link" >ICountryTypesResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICreateJournal.html" data-type="entity-link" >ICreateJournal</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IDataClientSearchResponse.html" data-type="entity-link" >IDataClientSearchResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IDistrictType.html" data-type="entity-link" >IDistrictType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IDistrictTypesResponse.html" data-type="entity-link" >IDistrictTypesResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IDocumentClient.html" data-type="entity-link" >IDocumentClient</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IDocumentClientSearch.html" data-type="entity-link" >IDocumentClientSearch</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IDocumentType.html" data-type="entity-link" >IDocumentType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IDocumentTypeClient.html" data-type="entity-link" >IDocumentTypeClient</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IDocumentTypesResponse.html" data-type="entity-link" >IDocumentTypesResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IEnum.html" data-type="entity-link" >IEnum</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IEquipmentClient.html" data-type="entity-link" >IEquipmentClient</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IEquipmentClientSearch.html" data-type="entity-link" >IEquipmentClientSearch</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IError.html" data-type="entity-link" >IError</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IGenderClient.html" data-type="entity-link" >IGenderClient</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IGqlError.html" data-type="entity-link" >IGqlError</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IJournal.html" data-type="entity-link" >IJournal</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IJuridicalType.html" data-type="entity-link" >IJuridicalType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IJuridicalTypesResponse.html" data-type="entity-link" >IJuridicalTypesResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ILogger.html" data-type="entity-link" >ILogger</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IMonetaryClient.html" data-type="entity-link" >IMonetaryClient</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IMsisdn.html" data-type="entity-link" >IMsisdn</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/INameClient.html" data-type="entity-link" >INameClient</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/INameClientSearch.html" data-type="entity-link" >INameClientSearch</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IOptionalPropertyClient.html" data-type="entity-link" >IOptionalPropertyClient</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPaymentTypeClient.html" data-type="entity-link" >IPaymentTypeClient</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IQueryStructured.html" data-type="entity-link" >IQueryStructured</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IQueryUnStructured.html" data-type="entity-link" >IQueryUnStructured</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IRegion.html" data-type="entity-link" >IRegion</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IRegionType.html" data-type="entity-link" >IRegionType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IRegionTypesResponse.html" data-type="entity-link" >IRegionTypesResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IRelationClient.html" data-type="entity-link" >IRelationClient</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IRequestParams.html" data-type="entity-link" >IRequestParams</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISearchClientPayload.html" data-type="entity-link" >ISearchClientPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISearchJournal.html" data-type="entity-link" >ISearchJournal</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISearchUnlinkedMsisdnsPayload.html" data-type="entity-link" >ISearchUnlinkedMsisdnsPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISearchUnlinkedMsisdnsResponse.html" data-type="entity-link" >ISearchUnlinkedMsisdnsResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IState.html" data-type="entity-link" >IState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IStateClient.html" data-type="entity-link" >IStateClient</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IStreetType.html" data-type="entity-link" >IStreetType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IStreetTypesResponse.html" data-type="entity-link" >IStreetTypesResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IStructuredClientName.html" data-type="entity-link" >IStructuredClientName</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IStructuredNameClientSearch.html" data-type="entity-link" >IStructuredNameClientSearch</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISubscriberClient.html" data-type="entity-link" >ISubscriberClient</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISubscriberClientSearch.html" data-type="entity-link" >ISubscriberClientSearch</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ITraceId.html" data-type="entity-link" >ITraceId</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IValidationError.html" data-type="entity-link" >IValidationError</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IValidationVariables.html" data-type="entity-link" >IValidationVariables</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PostSearchBody.html" data-type="entity-link" >PostSearchBody</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PostSearchResult.html" data-type="entity-link" >PostSearchResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SearchUnlinkedMsisdnsInput.html" data-type="entity-link" >SearchUnlinkedMsisdnsInput</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});