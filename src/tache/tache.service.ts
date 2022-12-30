import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Tache} from "./entities/tache.entity";
import { ulid } from 'ulidx';
import {PlaningService} from "../planing/planing.service";
import {EmployetacheService} from "../employetache/employetache.service";
import {EmployeService} from "../employe/employe.service";

@Injectable()
export class TacheService {
  constructor(
    @InjectRepository(Tache)
    private readonly tacheRepository: Repository<Tache>,
    private readonly planingService: PlaningService,
    private readonly employeTacheService: EmployetacheService,
    private readonly employeService: EmployeService,
  ) {}

  async setTache(tache: any): Promise<any> {
    const tacheResp =  await this.tacheRepository.save({ id: ulid(), ...tache })

    const planing = await this.planingService.findOne(tacheResp.planingId)
    const employeTache = await this.employeTacheService.findByTache(tache.id)

    const employes = []

    for (const tache of employeTache) {
      const employe = await this.employeService.findOne(tache.userId)
      employes.push(employes.push({
        ...employe,
        tacheInfo: tache
      }))
    }

    return {
      ...tacheResp,
      planing: planing !== null ? planing : {},
      employes: employes
    }

  }

  async findAll(): Promise<Tache[]> {
     const taches =  await this.tacheRepository.find({
      order: {
        id: 'DESC',
      },
    });

    const tachesPlaning = [];

    for (const tache of taches) {
      const planing = await this.planingService.findOne(tache.planingId);
      const employeTache = await this.employeTacheService.findByTache(tache.id)

      const employes = []

      for (const tache of employeTache) {
        const employe = await this.employeService.findOne(tache.userId)
        employes.push({
          ...employe,
          tacheInfo: tache
        })
      }


      const data = {
        ...tache,
        planing: planing !== null ? planing : {},
        employes: employes
      }

      tachesPlaning.push(data)
    }

    return tachesPlaning

  }

  async findOne(id: string): Promise<any> {
    const tache = await this.tacheRepository.findOneBy({ id: id });
    const planing = await this.planingService.findOne(tache.id)
    const employeTache = await this.employeTacheService.findByTache(tache.id)

    const employes = []

    for (const tache of employeTache) {
      const employe = await this.employeService.findOne(tache.userId)
      employes.push({
        ...employe,
        tacheInfo: tache
      })
    }

    return {
      ...tache,
      planing: planing !== null ? planing : {},
      employes: employes
    }
  }

  async remove(id: string): Promise<any> {
    return await this.tacheRepository.delete(id);
  }
}
