import {Reports} from './reports.model';
import {of} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class MockReportsService {
  MOCK_DATA: Reports[] = [
    {
      id: '1734166872354', agentId: '1', missionId: '1', date: '2024-12-14T10:01:12+01:00',
      body: 'Arrivée à Chengdu et activation de l’identité de couverture en tant que Clément Dubreuil, consultant ' +
        'pour GreenCore Strategies. Participation à une conférence sur les énergies renouvelables organisée par un ' +
        'organisme local, permettant un premier contact indirect avec Zhao Wen. Aucun échange direct, mais observation ' +
        'de son cercle immédiat, notamment deux collaborateurs techniques qui semblent influents. Validation des ' +
        'installations pour les communications cryptées.\n' +
        '\n' +
        'Progrès :\n' +
        'Réseautage initial effectué avec succès dans des cercles professionnels.\n' +
        'Préparation de la présentation d’un projet fictif pour établir un motif crédible de collaboration.\n' +
        '\n' +
        'Risques identifiés :\n' +
        'Présence visible de membres de la sécurité locale dans les événements, potentiellement liés à Zhao Wen.\n' +
        'Surveillance numérique accrue à l’hôtel, nécessitant des précautions supplémentaires.'
    },
    {
      id: '1735047908816', agentId: '1', missionId: '1', date: '2024-12-22T14:45:08+01:00',
      body: 'Participation à un dîner privé avec plusieurs membres du consortium, facilité par un contact obtenu lors ' +
        'de la conférence. Interaction directe avec Zhao Wen, qui s’est montré réceptif à l’idée d’une collaboration ' +
        'technique. Une invitation préliminaire pour visiter leurs installations a été proposée, sous réserve de ' +
        'fournir un avant-projet crédible pour validation. Réunion préparatoire avec l’équipe locale pour coordonner ' +
        'la transmission d’éventuelles données collectées.\n' +
        '\n' +
        'Progrès :\n' +
        'Premier échange direct avec la cible principale.\n' +
        'Mise en place d’un rendez-vous à potentiel stratégique.\n' +
        '\n' +
        'Risques identifiés :\n' +
        'Contrôle accru des antécédents de la légende, nécessité de renforcer la crédibilité.\n' +
        'Probabilité élevée de fouille physique ou numérique lors de la visite des installations.\n'
    },
    {
      id: '1735493447095', agentId: '1', missionId: '1', date: '2024-12-29T18:30:47+01:00',
      body: 'Participation à la réunion clé au siège du consortium à Chengdu. Utilisation d’une montre connectée ' +
        'modifiée pour capturer les échanges numériques lors de la présentation. Les documents récupérés confirment ' +
        'l’existence d’un projet militaire dissimulé sous l’apparence d’une recherche énergétique. Zhao Wen a exprimé ' +
        'un intérêt marqué pour une collaboration future, facilitant une possible réintroduction si nécessaire. ' +
        'Extraction des données transmises avec succès à l’appui local pour analyse.\n' +
        '\n' +
        'Progrès :\n' +
        'Confirmation des suspicions initiales concernant le projet.\n' +
        'Acquisition de documents sensibles et preuves numériques.\n' +
        '\n' +
        'Risques identifiés :\n' +
        'Surveillance persistante à la sortie des locaux, nécessitant une exfiltration discrète.\n' +
        'Renforcement de la sécurité autour de Zhao Wen, limitant les opportunités futures.'
    },
  ];

  getReports() {
    return of(this.MOCK_DATA);
  }
}


