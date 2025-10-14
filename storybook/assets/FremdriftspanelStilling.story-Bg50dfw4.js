import{h as I,j as t,aL as k,S as w,h_ as j,i9 as u,ia as x}from"./iframe-B0cNm80T.js";import{w as m,c as D}from"./ContextDecorators-rWs2WyLp.js";import{K as b}from"./schema.zod-BaAA7GsH.js";import{u as _}from"./useKandidatlisteForEier-CcPy2BRP.js";import{F as y,A as N}from"./FullførtStilling-DKhBmAw7.js";import{R as T}from"./GjenåpneStillingKnapp-CujCZhwg.js";import{K as g,I as v}from"./KandidatTyper-CkRsvxsW.js";import{T as A}from"./TilgangskontrollForInnhold-C4I0zAmX.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-lKcZdIDi.js";import"./OrganisasjonsnummerAlert-By0RKHGl.js";import"./VStack-psTiiBW2.js";import"./BasePrimitive-Dnjwyk_L.js";import"./List-CwgKauhL.js";import"./Link-CvjagGWj.js";import"./KandidatHendelseTag-C5ff4Ain.js";import"./Tag-BBfBa6uK.js";import"./ChatExclamationmark-DogGhrjI.js";import"./FileXMark-260EKdwe.js";import"./Trash-DngtWOea.js";import"./HandShakeHeart-Buew0_gz.js";import"./Calendar-B6sM_WIj.js";import"./ThumbUp-DXn5sJq9.js";import"./Table--dP5e_vE.js";import"./util-CAU_umkw.js";import"./format-DaA7nAok.js";import"./match-B6SzKG0i.js";import"./parseISO-cg8KmGPa.js";import"./parse--eY5Mgca.js";import"./getDefaultOptions-U4OPOZza.js";import"./util-BOeZlekJ.js";import"./kandidat.mock-D-adIdQl.js";import"./innsatsgrupper-BqldBv0r.js";import"./accordion-Cm671LVy.js";import"./index-BUMEN2W9.js";import"./index-CwVO0zJi.js";import"./index-DzXDlYFQ.js";import"./ChevronDown-DdRd8IuF.js";import"./Box-B0XTLzF0.js";import"./Bell-CQ2xQqVa.js";import"./PersonChat-RcZXm9ar.js";import"./Eye-D2tETnyv.js";import"./ProgressBar-CXr-Rml1.js";import"./oppdaterStilling-BPjtusFI.js";import"./EyeSlash-BY0BBMcL.js";import"./CircleSlash-D8e8t69m.js";import"./Modal-0KnAjZ93.js";import"./floating-ui.react-b-pUd3Lp.js";import"./Date.Input-CEBq0Klp.js";import"./useFormField-1AfxlixV.js";import"./useControllableState-BJDZ-eZz.js";import"./Modal.context-B_Ji0Bce.js";import"./Checkbox-jOSUCRQZ.js";import"./Fieldset-naiMBlIr.js";import"./Pencil-CaALIL-I.js";import"./PersonbrukerTekst-CFyCEwAM.js";import"./ClockDashed-DO-2JVfj.js";import"./Tasklist-Begj_cXM.js";import"./ErrorBoundary-DTa0Ptcq.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=_(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(w,{hooks:[d],children:e=>{const F=e.status===b.Lukket&&i.stilling.status===j.Stoppet,f=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,K=e?.kandidater.filter(s=>s.utfallsendringer.some(R=>R.sendtTilArbeidsgiversKandidatliste===!0)).length??0,B=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,h=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,S=B+h;return F?t.jsx(y,{dropDown:r,totalStillinger:f,antallFåttJobben:S}):t.jsx(N,{antallFåttJobben:S,antallDelt:K,totalStillinger:f,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Pt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:v.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=x,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
