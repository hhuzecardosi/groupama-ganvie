import {Injectable} from '@angular/core';
import {Missions} from './missions.model';
import {Observable, of} from 'rxjs';

@Injectable({providedIn: 'root'})
export class MockMissionsService {
  MOCK_DATA: Missions[] = [
    {
      id: '1', text: 'Clément Dubreuil, consultant français en énergies renouvelables, est envoyé en Chine pour ' +
        'infiltrer un consortium privé soupçonné d’être une couverture pour des activités de renseignement militaire. ' +
        'Sous son identité de couverture, il doit gagner la confiance de Zhao Wen, le coordinateur principal, afin de ' +
        'participer à une réunion stratégique à Chengdu. L’objectif est de collecter des preuves sur les intentions ' +
        'réelles du projet, tout en évitant la surveillance étroite du contre-espionnage chinois. Cette mission ' +
        'nécessite une infiltration subtile dans un environnement sous haute tension sécuritaire.'
    },
    {
      id: '2',
      text: 'Nadine Fleury, journaliste canadienne indépendante, est chargée d’infiltrer une ONG humanitaire à ' +
        'Beyrouth, soupçonnée de dissimuler un réseau terroriste. Son but est d’approcher Omar Khaled, l’un des leaders ' +
        'de l’organisation, et de cartographier leurs activités clandestines. Entre les interviews et les contacts ' +
        'informels, elle doit localiser des caches d’armes et identifier les relais européens du groupe. Agissant seule ' +
        'dans une zone instable, elle prend le risque d’être exposée ou d’être prise pour cible par le groupe ou les ' +
        'forces locales.'
    },
    {
      id: '3', text: 'Sous l’identité de Viktor Karelson, ingénieur suédois en cybersécurité, un agent est envoyé à ' +
        'Prague pour infiltrer un réseau clandestin spécialisé dans le transfert de données sensibles à une puissance ' +
        'étrangère hostile. Sa mission consiste à établir un lien avec Marko Vlk, le chef présumé du réseau, et à ' +
        'introduire un malware dans leur infrastructure. Il doit également saboter leurs canaux de communication sans ' +
        'alerter les membres de la cellule. La discrétion est cruciale dans cette mission où tout faux pas pourrait ' +
        'entraîner de lourdes représailles.'
    }
  ]

  getMissionById(id: string): Observable<Missions | {}> {
    return of(this.MOCK_DATA.find(mission => mission.id === id) || {});
  }

}
