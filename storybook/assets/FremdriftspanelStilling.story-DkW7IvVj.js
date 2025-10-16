import{h as I,j as t,aL as k,S as w,h_ as j,i9 as u,ia as x}from"./iframe-snWmX9TD.js";import{w as m,c as D}from"./ContextDecorators-C8P-ZU83.js";import{K as b}from"./schema.zod-D7lrJS6h.js";import{u as _}from"./useKandidatlisteForEier-DwOd98lW.js";import{F as y,A as N}from"./FullførtStilling-BVEJt125.js";import{R as T}from"./GjenåpneStillingKnapp-BvxyFrsF.js";import{K as g,I as v}from"./KandidatTyper-CkRsvxsW.js";import{T as A}from"./TilgangskontrollForInnhold-CAaAflj3.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-DiIprio7.js";import"./OrganisasjonsnummerAlert-C1KOYz4l.js";import"./VStack-DYQQZgmC.js";import"./BasePrimitive-DjqUARAj.js";import"./List-D4_oDTPd.js";import"./Link-Bs0IdPBn.js";import"./KandidatHendelseTag-CYfLyN-o.js";import"./Tag-BtoNRPee.js";import"./ChatExclamationmark-BCdEIfFA.js";import"./FileXMark-DS_H3S1v.js";import"./Trash-CuOAktuw.js";import"./HandShakeHeart-Bd_lrBE5.js";import"./Calendar-BPQUzo9Z.js";import"./ThumbUp-Nw3u3CnL.js";import"./Table-BEKaglzQ.js";import"./util-CGtdeXch.js";import"./format-QCVIWe3h.js";import"./match-CFAKH4gu.js";import"./parseISO-gkf-uHbp.js";import"./parse-Bn1NgIYy.js";import"./getDefaultOptions-AlGiha7p.js";import"./util-Oftb2yQf.js";import"./kandidat.mock-BgmDDF-1.js";import"./innsatsgrupper-BqldBv0r.js";import"./accordion-BHafjyM9.js";import"./index-BC8o3Ncw.js";import"./index-BkwbxdjA.js";import"./index-B7SAHy-5.js";import"./ChevronDown-DGQah_1I.js";import"./Box-PJe9VxjM.js";import"./Bell-Cr-43g_l.js";import"./PersonChat-yuUoKlRN.js";import"./Eye-DHRc0PCC.js";import"./ProgressBar-DvtGsVvq.js";import"./oppdaterStilling-DmA3zkEp.js";import"./EyeSlash-BMdcrW58.js";import"./CircleSlash-G7bBHpZ8.js";import"./Modal-UCe-SUpk.js";import"./floating-ui.react-Dy0YYy8f.js";import"./Date.Input-BCSo7M-T.js";import"./useFormField-DoXpaKLg.js";import"./useControllableState-DyA8QYIk.js";import"./Modal.context-B5wvo_mf.js";import"./Checkbox-DUIp8nIs.js";import"./Fieldset-CZ9pSfF3.js";import"./Pencil-Du4UrKmF.js";import"./PersonbrukerTekst-XE9OmvZa.js";import"./ClockDashed-CyOnIRC8.js";import"./Tasklist-W9X-RvW7.js";import"./ErrorBoundary-dMfWcQpa.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=_(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(w,{hooks:[d],children:e=>{const F=e.status===b.Lukket&&i.stilling.status===j.Stoppet,f=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,K=e?.kandidater.filter(s=>s.utfallsendringer.some(R=>R.sendtTilArbeidsgiversKandidatliste===!0)).length??0,B=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,h=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,S=B+h;return F?t.jsx(y,{dropDown:r,totalStillinger:f,antallFåttJobben:S}):t.jsx(N,{antallFåttJobben:S,antallDelt:K,totalStillinger:f,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Pt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:v.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=x,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />)
}`,...l.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />)
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => {
    // Lukket kandidatliste og stoppet stilling -> Fullført visning
    const stillingsData = {
      ...mockBaseStilling,
      stilling: {
        ...mockBaseStilling.stilling,
        status: 'INACTIVE',
        publishedByAdmin: mockBaseStilling.stilling.publishedByAdmin || new Date().toISOString()
      }
    } as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      lukket: true,
      antall: 4,
      status: InternKandidatstatus.AKTUELL,
      utfall: KandidatutfallTyper.FATT_JOBBEN,
      stillingsData
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />, liste, stillingsData);
  }
}`,...a.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const stillingsData = mockFormidling as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      stillingsData,
      antall: 2
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />, liste, stillingsData);
  }
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Pt as default};
